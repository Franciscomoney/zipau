const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

const { disconnectApi, getBalance } = require('./paseoClient');
const { initWallets, getWalletAddresses } = require('./wallets');
const metadataStore = require('./metadataStore');
const txRefStore = require('./txRefStore');
const flowHistory = require('./flowHistory');
const {
  submitMetadata,
  executeInitialTransfer,
  executeSecondaryTransfer,
  executeFlow,
} = require('./transferService');
const { planckToPas } = require('./utils');

async function bootstrap() {
  dotenv.config();

  if (!process.env.ZIPA_ROOT_SEED && !process.env.ESCROW_WALLET_SEED) {
    const bochicaEnv = path.resolve(__dirname, '../../bochica/.env.local');
    dotenv.config({ path: bochicaEnv, override: false });
  }

  await initWallets();

  const app = express();
  app.use(express.json());

  const port = Number(process.env.PORT || 2021);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', network: 'Paseo Testnet' });
  });

  app.get('/wallets', async (_req, res, next) => {
    try {
      const addresses = await getWalletAddresses();
      const creatorBalance = await getBalance(addresses.creator);
      const platformBalance = await getBalance(addresses.platform);
      const lenderBalance = await getBalance(addresses.lender);

      res.json({
        creator: {
          address: addresses.creator,
          balancePlanck: creatorBalance.toString(),
          balancePas: planckToPas(creatorBalance),
        },
        platform: {
          address: addresses.platform,
          balancePlanck: platformBalance.toString(),
          balancePas: planckToPas(platformBalance),
        },
        lender: {
          address: addresses.lender,
          balancePlanck: lenderBalance.toString(),
          balancePas: planckToPas(lenderBalance),
        },
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/metadata', (_req, res) => {
    const entries = metadataStore.list().map((entry) => {
      const refs = flowHistory.get(entry.id);
      return {
        ...entry,
        txRefs: refs.length > 0 ? refs : entry.txRefs || [],
      };
    });

    res.json({ entries });
  });

  app.get('/metadata/tx-refs', (_req, res) => {
    const entries = metadataStore.list().map((entry) => ({
      id: entry.id,
      txRefs: flowHistory.get(entry.id),
    }));
    res.json({ entries });
  });

  app.post('/metadata', async (req, res, next) => {
    try {
      const record = await submitMetadata(req.body || {});
      res.status(201).json({ record });
    } catch (error) {
      next(error);
    }
  });

  app.post('/transfer/initial', async (req, res, next) => {
    try {
      const amount = req.body?.amountPas ?? 1000;
      const result = await executeInitialTransfer(amount);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  });

  app.post('/transfer/secondary', async (req, res, next) => {
    try {
      const amount = req.body?.amountPas ?? 20;
      const result = await executeSecondaryTransfer(amount);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  });

  app.post('/flow', async (req, res, next) => {
    try {
      const { metadata, requestedTokens, initialAmount } = req.body || {};
      const summary = await executeFlow({ metadata, requestedTokens, initialAmount });

      const metadataId = summary?.steps?.metadata?.metadataId;
      const buildTxRefs = () => {
        const refs = [];
        const { initialTransfer, secondaryTransfer } = summary?.steps || {};
        if (initialTransfer?.txHash) {
          refs.push({
            label: 'Creator → Platform (principal)',
            hash: initialTransfer.txHash,
            blockHash: initialTransfer.blockHash,
            explorerUrl: `https://paseo.subscan.io/extrinsic/${initialTransfer.txHash}`,
          });
        }

        if (secondaryTransfer?.txHash) {
          refs.push({
            label: 'Platform → Lender (reward)',
            hash: secondaryTransfer.txHash,
            blockHash: secondaryTransfer.blockHash,
            explorerUrl: `https://paseo.subscan.io/extrinsic/${secondaryTransfer.txHash}`,
          });
        }

        return refs;
      };

      const refs = buildTxRefs();
      let responsePayload = {
        ...summary,
        txRefs: refs,
      };

      if (metadataId) {
        const aggregated = flowHistory.record(metadataId, refs);
        txRefStore.append(metadataId, refs);
        const refreshed = metadataStore.getById(metadataId);
        responsePayload = {
          ...responsePayload,
          metadata: refreshed
            ? { ...refreshed, txRefs: aggregated }
            : { id: metadataId, txRefs: aggregated },
          txRefs: aggregated,
        };
      }

      res.json(responsePayload);
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Unexpected error' });
  });

  app.use(express.static(path.join(__dirname, 'public')));

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`zipa-polka server listening on http://0.0.0.0:${port}`);
  });

  const shutdown = async () => {
    console.log('Shutting down zipa-polka...');
    server.close(() => {
      void disconnectApi().finally(() => process.exit(0));
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap server:', error);
  process.exit(1);
});
