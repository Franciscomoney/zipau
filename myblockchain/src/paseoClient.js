const { ApiPromise, WsProvider } = require('@polkadot/api');

let apiInstance = null;

async function getApi() {
  if (apiInstance) {
    return apiInstance;
  }

  const endpoint = process.env.PASEO_RPC_ENDPOINT || 'wss://paseo.rpc.amforc.com';
  const provider = new WsProvider(endpoint);
  apiInstance = await ApiPromise.create({ provider });

  apiInstance.on('disconnected', () => {
    apiInstance = null;
  });

  return apiInstance;
}

async function disconnectApi() {
  if (apiInstance) {
    await apiInstance.disconnect();
    apiInstance = null;
  }
}

async function getBalance(address) {
  const api = await getApi();
  const { data } = await api.query.system.account(address);
  return BigInt(data.free.toString());
}

module.exports = {
  getApi,
  disconnectApi,
  getBalance,
};
