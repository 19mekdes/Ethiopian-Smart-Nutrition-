
const WHO_WFA_Boys = {  };
const WHO_WFA_Girls = {  };

function getZScore(weight, ageInMonths, sex) {
  const table = sex === 'Male' ? WHO_WFA_Boys : WHO_WFA_Girls;
  const ref = table[Math.round(ageInMonths)];
  if (!ref) return null;
  const L = ref.L, M = ref.M, S = ref.S;
  const Z = ((weight / M) ** L - 1) / (S * L);
  return parseFloat(Z.toFixed(2));
}

module.exports = { getZScore };