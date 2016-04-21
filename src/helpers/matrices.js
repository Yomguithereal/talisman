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

/**
 * Function transposing the given matrix.
 *
 * @param  {array} target - The target matrix.
 * @return {array}        - The transposed matrix.
 */
export function transpose(target) {
  const m = target.length,
        n = target[0].length;

  const transposed = new Array(n);

  for (let j = 0; j < n; j++) {
    transposed[j] = new Array(m);

    for (let i = 0; i < m; i++)
      transposed[j][i] = target[i][j];
  }

  return transposed;
}
