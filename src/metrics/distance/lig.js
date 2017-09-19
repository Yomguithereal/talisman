/**
 * Talisman metrics/distance/lig
 * ==============================
 *
 * LIG2 & LIG3 distances.
 *
 * Note that the LIG1 distance is not implemented here because it's deemed
 * less useful by the paper's authors and because they seem to use a different
 * definition of the Guth distance function that the widely accepted one (as
 * hinted in another paper).
 *
 * [Article]:
 * An Interface for Mining Genealogical Nominal Data Using the Concept of
 * linkage and a Hybrid Name Matching Algorithm.
 * Chakkrit Snae, Bernard Diaz
 * Department of Computer Science, The University of Liverpool
 * Peach Street, Liverpool, UK, L69 7ZF
 */
import levenshtein from './levenshtein';

/**
 * LIG2 similarity metric.
 *
 * @param  {string|array} a - First sequence.
 * @param  {string|array} b - Second sequence.
 * @return {number}
 */
export function lig2(a, b) {
  if (a === b)
    return 1;

  let tmp;

  // Swapping so that a is the shortest
  if (a.length > b.length) {
    tmp = a;
    a = b;
    b = tmp;
  }

  const C = levenshtein(a, b),
        I = b.length - C;

  return I / (I + C);
}

/**
 * LIG3 similarity metric.
 *
 * @param  {string|array} a - First sequence.
 * @param  {string|array} b - Second sequence.
 * @return {number}
 */
export function lig3(a, b) {
  if (a === b)
    return 1;

  let tmp;

  // Swapping so that a is the shortest
  if (a.length > b.length) {
    tmp = a;
    a = b;
    b = tmp;
  }

  const C = levenshtein(a, b),
        I = b.length - C;

  return 2 * I / (2 * I + C);
}
