const PAS_UNIT = BigInt(10) ** BigInt(10);

function normalizeAmount(value) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('Amount must be a finite number');
    }
    return value.toString();
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error('Amount cannot be empty');
    }
    return trimmed;
  }

  throw new Error('Amount must be a number or string');
}

function pasToPlanck(value) {
  const normalized = normalizeAmount(value);
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid amount format: ${normalized}`);
  }

  const [wholePart, fractionPart = ''] = normalized.split('.');
  const paddedFraction = (fractionPart + '0000000000').slice(0, 10);

  return BigInt(wholePart || '0') * PAS_UNIT + BigInt(paddedFraction || '0');
}

function planckToPas(planckValue) {
  const planck = BigInt(planckValue.toString());
  const whole = planck / PAS_UNIT;
  const remainder = planck % PAS_UNIT;

  if (remainder === 0n) {
    return whole.toString();
  }

  const fraction = remainder.toString().padStart(10, '0').replace(/0+$/, '');
  return `${whole.toString()}.${fraction}`;
}

function formatPas(planckValue, precision = 4) {
  const planck = BigInt(planckValue.toString());
  const amount = Number(planck) / Number(PAS_UNIT);
  return amount.toFixed(precision);
}

module.exports = {
  PAS_UNIT,
  pasToPlanck,
  planckToPas,
  formatPas,
};
