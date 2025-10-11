const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady, encodeAddress } = require('@polkadot/util-crypto');

let cachedWallets = null;
let keyringInstance = null;

function getDerivationFromEnv(key, fallback) {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : fallback;
}

async function initWallets() {
  if (cachedWallets) {
    return cachedWallets;
  }

  await cryptoWaitReady();

  if (!keyringInstance) {
    keyringInstance = new Keyring({ type: 'sr25519' });
  }

  const rootSeed = (process.env.ZIPA_ROOT_SEED || process.env.ESCROW_WALLET_SEED || '').trim();

  if (!rootSeed) {
    throw new Error('Missing ZIPA_ROOT_SEED or ESCROW_WALLET_SEED environment variable');
  }

  const root = keyringInstance.addFromMnemonic(rootSeed);

  const platformPath = getDerivationFromEnv('ZIPA_PLATFORM_PATH', '//0');
  const creatorPath = getDerivationFromEnv('ZIPA_CREATOR_PATH', '//1');
  const lenderPath = getDerivationFromEnv('ZIPA_LENDER_PATH', '//2');

  const platform = root.derive(platformPath);
  const creator = root.derive(creatorPath);
  const lender = root.derive(lenderPath);

  cachedWallets = {
    root,
    platform,
    creator,
    lender,
  };

  return cachedWallets;
}

async function getWalletAddresses() {
  const wallets = await initWallets();

  return {
    creator: encodeAddress(wallets.creator.publicKey, 0),
    platform: encodeAddress(wallets.platform.publicKey, 0),
    lender: encodeAddress(wallets.lender.publicKey, 0),
  };
}

module.exports = {
  initWallets,
  getWalletAddresses,
};
