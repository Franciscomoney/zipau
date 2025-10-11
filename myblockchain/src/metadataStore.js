const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'metadata.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const initial = { counter: 1, records: [] };
    fs.writeFileSync(dataFile, JSON.stringify(initial, null, 2));
  }
}

function loadState() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const parsed = JSON.parse(raw);
    const loadedRecords = Array.isArray(parsed.records) ? parsed.records : [];
    return {
      counter: Number(parsed.counter) || 1,
      records: loadedRecords,
    };
  } catch (error) {
    console.error('Failed to load metadata store, resetting.', error);
    return { counter: 1, records: [] };
  }
}

function persistState() {
  const payload = {
    counter,
    records,
  };
  fs.writeFileSync(dataFile, JSON.stringify(payload, null, 2));
}

const { counter: loadedCounter, records: loadedRecords } = loadState();
const records = loadedRecords;
const txRefMap = new Map(records.map((entry) => [entry.id, entry.txRefs || []]));
let counter = loadedCounter;

function clone(entry) {
  if (!entry) return null;
  const refs = txRefMap.get(entry.id) || entry.txRefs || [];
  return {
    ...entry,
    metadata: entry.metadata ? { ...entry.metadata } : {},
    txRefs: refs.map((ref) => ({ ...ref })),
  };
}

function add(metadata) {
  const entry = {
    id: counter++,
    timestamp: new Date().toISOString(),
    metadata: metadata ?? {},
    txRefs: [],
  };

  records.push(entry);
  txRefMap.set(entry.id, []);
  persistState();
  return clone(entry);
}

function list() {
  return records.map(clone);
}

function getById(id) {
  const record = records.find((item) => item.id === id);
  return clone(record);
}

function update(id, patch = {}) {
  const record = records.find((item) => item.id === id);
  if (!record) return null;

  if (patch.metadata && typeof patch.metadata === 'object') {
    record.metadata = { ...record.metadata, ...patch.metadata };
  }

  if (patch.txRefs && Array.isArray(patch.txRefs)) {
    record.txRefs = [...patch.txRefs];
    txRefMap.set(record.id, [...patch.txRefs]);
  }

  const { metadata, txRefs, ...rest } = patch;
  Object.assign(record, rest);

  persistState();

  return clone(record);
}

function appendTxRefs(id, refs) {
  const record = records.find((item) => item.id === id);
  if (!record) return null;

  const normalized = Array.isArray(refs) ? refs : [refs];
  const cleaned = normalized.map((ref) => ({ ...ref }));
  const current = txRefMap.get(id) || record.txRefs || [];
  const updated = [...current, ...cleaned];
  record.txRefs = updated;
  txRefMap.set(id, updated);
  persistState();
  return clone(record);
}

function latest() {
  if (!records.length) return null;
  return clone(records[records.length - 1]);
}

module.exports = {
  add,
  list,
  getById,
  update,
  appendTxRefs,
  latest,
};
