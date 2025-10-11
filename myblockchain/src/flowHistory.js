const store = new Map();

function record(metadataId, refs) {
  if (!metadataId) return [];
  const existing = store.get(metadataId) || [];
  const normalized = Array.isArray(refs) ? refs.map((ref) => ({ ...ref })) : [];
  const merged = [...existing, ...normalized];
  store.set(metadataId, merged);
  return merged.map((ref) => ({ ...ref }));
}

function get(metadataId) {
  const refs = store.get(metadataId) || [];
  return refs.map((ref) => ({ ...ref }));
}

module.exports = {
  record,
  get,
};
