/**
 * Talisman distances/levenshtein
 * ===============================
 *
 * Functions computing the Levenshtein distance.
 */
import {seq} from '../helpers';

/**
 * Function returning the Levenshtein distance between two sequences.
 *
 * @param  {mixed}  a     - The first sequence to process.
 * @param  {mixed}  b     - The second sequence to process.
 * @return {number}       - The Levenshtein distance between a & b.
 */
export default function levenshtein(a, b) {
  a = seq(a);
  b = seq(b);

  if (!a.length)
    return b.length;
  if (!b.length)
    return a.length;

  const matrix = [];

  // Incrementing the cells horizontally
  for (let i = 0, l = b.length; i <= l; i++)
    matrix[i] = [i];

  // Incrementing the cells vertically
  for (let i = 0, l = a.length; i <= l; i++)
    matrix[0][i] = i;

  // Filling the matrix
  for (let i = 1, l = b.length; i <= l; i++) {
    for (let j = 1, m = a.length; j <= m; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      }
      else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Alternative export.
 */
export {levenshtein as distance};
