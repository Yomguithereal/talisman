/**
 * Talisman matrices
 * ==================
 *
 * Compilation of various helpers to deal with matrices.
 */

/**
 * Function creating a matrix of m lines & n columns.
 *
 * @param  {number} m    - Number of lines.
 * @param  {number} n    - Number of columns.
 * @return {array}       - The resulting matrix.
 */
export function mat(m, n) {
  const matrix = new Array(m);

  for (let i = 0; i < m; i++)
    matrix[i] = new Array(n);

  return matrix;
}
