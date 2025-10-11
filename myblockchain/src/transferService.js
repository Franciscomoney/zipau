const { encodeAddress } = require('@polkadot/util-crypto');

const metadataStore = require('./metadataStore');
const { getApi } = require('./paseoClient');
const { initWallets } = require('./wallets');
const { pasToPlanck, planckToPas } = require('./utils');

async function submitMetadata(metadata) {
  if (metadata && typeof metadata === 'object' && Object.keys(metadata).length > 0) {
    return metadataStore.add(metadata);
  }
  return null;
}

async function signAndFinalize(extrinsic, signer, api) {
  return new Promise(async (resolve, reject) => {
    let unsub;

    try {
      unsub = await extrinsic.signAndSend(signer, (result) => {
        const { status, dispatchError, txHash, events } = result;

        if (dispatchError) {
          let errorMessage = dispatchError.toString();

          if (dispatchError.isModule) {
            const meta = api.registry.findMetaError(dispatchError.asModule);
            errorMessage = `${meta.section}.${meta.name}`;
          }

          if (unsub) {
            unsub();
          }

          reject(new Error(errorMessage));
          return;
        }

        if (status.isFinalized) {
          if (unsub) {
            unsub();
          }

          resolve({
            txHash: txHash.toHex(),
            blockHash: status.asFinalized.toHex(),
            events: events.map(({ event }) => `${event.section}.${event.method}`),
          });
        }
      });
    } catch (error) {
      if (unsub) {
        unsub();
      }
      reject(error);
    }
  });
}

async function executeInitialTransfer(amountPas = 1000) {
  const api = await getApi();
  const { creator, platform } = await initWallets();

  const amountPlanck = pasToPlanck(amountPas);
  const toAddress = encodeAddress(platform.publicKey, 0);
  const fromAddress = encodeAddress(creator.publicKey, 0);

  const extrinsic = api.tx.balances.transferKeepAlive(toAddress, amountPlanck);
  const outcome = await signAndFinalize(extrinsic, creator, api);

  return {
    ...outcome,
    from: fromAddress,
    to: toAddress,
    amountPas,
    amountPlanck: amountPlanck.toString(),
    amountFormatted: planckToPas(amountPlanck),
  };
}

async function executeSecondaryTransfer(amountPas = 20) {
  const api = await getApi();
  const { platform, lender } = await initWallets();

  const amountPlanck = pasToPlanck(amountPas);
  const toAddress = encodeAddress(lender.publicKey, 0);
  const fromAddress = encodeAddress(platform.publicKey, 0);

  const extrinsic = api.tx.balances.transferKeepAlive(toAddress, amountPlanck);
  const outcome = await signAndFinalize(extrinsic, platform, api);

  return {
    ...outcome,
    from: fromAddress,
    to: toAddress,
    amountPas,
    amountPlanck: amountPlanck.toString(),
    amountFormatted: planckToPas(amountPlanck),
  };
}

async function executeFlow({ metadata, requestedTokens = 20, initialAmount = 1000 } = {}) {
  const metadataRecord = await submitMetadata(metadata);

  const initialTransfer = await executeInitialTransfer(initialAmount);
  const secondaryTransfer = await executeSecondaryTransfer(requestedTokens);

  const explorerUrl = (hash) => `https://paseo.subscan.io/extrinsic/${hash}`;
  const txRefs = [
    {
      label: 'Creator → Platform (principal)',
      hash: initialTransfer.txHash,
      blockHash: initialTransfer.blockHash,
      explorerUrl: explorerUrl(initialTransfer.txHash),
    },
    {
      label: 'Platform → Lender (reward)',
      hash: secondaryTransfer.txHash,
      blockHash: secondaryTransfer.blockHash,
      explorerUrl: explorerUrl(secondaryTransfer.txHash),
    },
  ];

  let metadataId = metadataRecord?.id;
  let linkedMetadata = metadataRecord;

  if (!metadataId) {
    const latestRecord = metadataStore.latest();
    if (latestRecord) {
      metadataId = latestRecord.id;
      linkedMetadata = latestRecord;
    }
  }

  if (metadataId) {
    metadataStore.appendTxRefs(metadataId, txRefs);
    linkedMetadata = metadataStore.getById(metadataId);
  }

  const metadataStep = metadataId
    ? {
        status: metadataRecord ? 'recorded' : 'linked-to-latest',
        metadataId,
      }
    : {
        status: 'not-linked',
      };

  return {
    metadata: linkedMetadata ? { ...linkedMetadata, txRefs: txRefs } : null,
    txRefs,
    steps: {
      metadata: metadataStep,
      initialTransfer,
      secondaryTransfer,
    },
  };
}

module.exports = {
  submitMetadata,
  executeInitialTransfer,
  executeSecondaryTransfer,
  executeFlow,
};
