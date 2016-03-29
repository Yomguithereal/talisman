/**
 * Talisman metrics/mra
 * =====================
 *
 * Functions applying the Match Rating Approach comparison.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Match_rating_approach
 *
 * [Article]:
 * Moore, G B.; Kuhns, J L.; Treffzs, J L.; Montgomery, C A. (Feb 1, 1977).
 * Accessing Individual Records from Personal Data Files Using Nonunique
 * Identifiers.
 * US National Institute of Standards and Technology. p. 17. NIST SP - 500-2.
 */
import codex from '../phonetics/mra';

/**
 * Helpers.
 */
function reverse(string) {
  return string
    .split('')
    .reverse()
    .join('');
}

/**
 * Function returning the result of the MRA comparison between two names.
 *
 * @param  {mixed}  a          - The first name.
 * @param  {mixed}  b          - The second name.
 * @return {object|null}       - The comparison result.
 */
export default function mra(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string')
    throw Error('talisman/metrics/mra: given names should be strings.');

  const codexA = codex(a),
        codexB = codex(b);

  if (Math.abs(codexA.length - codexB.length) > 3)
    return null;

  // Finding the minimum rating value
  const sum = codexA.length + codexB.length;

  let minimum = 2;

  if (sum <= 4) minimum = 5;
  if (sum > 4 && sum <= 7) minimum = 4;
  if (sum > 7 && sum <= 11) minimum = 3;

  let codexALR = '',
      codexBLR = '';

  // Dropping duplicates from left to right
  for (let i = 0, l = Math.max(codexA.length, codexB.length); i < l; i++) {
    if (codexA[i] !== codexB[i]) {
      codexALR += codexA[i] ? codexA[i] : '';
      codexBLR += codexB[i] ? codexB[i] : '';
    }
  }

  codexALR = reverse(codexALR);
  codexBLR = reverse(codexBLR);

  let codexARL = '',
      codexBRL = '';

  // Dropping duplicates from right to left
  for (let i = 0, l = Math.max(codexALR.length, codexBLR.length); i < l; i++) {
    if (codexALR[i] !== codexBLR[i]) {
      codexARL += codexALR[i] ? codexALR[i] : '';
      codexBRL += codexBLR[i] ? codexBLR[i] : '';
    }
  }

  const unmatched = Math.max(codexARL.length, codexBRL.length),
        similarity = 6 - unmatched,
        matching = similarity >= minimum;

  // Returning the result
  return {
    codex: [codexA, codexB],
    minimum,
    similarity,
    matching
  };
}
