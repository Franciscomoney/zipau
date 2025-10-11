const store = new Map();

function clone(ref) {
  return { ...ref };
}

function normalize(refs) {
  if (!refs) return [];
  if (Array.isArray(refs)) {
    return refs.map(clone);
  }
  return [clone(refs)];
}

function append(metadataId, refs) {
  if (!metadataId) {
    return [];
  }

  const normalized = normalize(refs);
  const existing = store.get(metadataId) || [];
  const merged = [...existing, ...normalized];
  store.set(metadataId, merged);
  return merged.map(clone);
}

function get(metadataId) {
  const refs = store.get(metadataId) || [];
  return refs.map(clone);
}

module.exports = {
  append,
  get,
};
