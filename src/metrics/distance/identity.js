/**
 * Talisman metrics/distance/identity
 * ===================================
 *
 * Identity distance/similarity.
 *
 * [Tags]: metric, string metric.
 */

/**
 * Identity distance.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Distance between 0 & 1.
 */
export function distance(a, b) {
  if (typeof a === 'string')
    return a === b ? 0 : 1;

  if (a === b)
    return 0;

  if (a.length !== b.length)
    return 1;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      return 1;
  }

  return 0;
}

/**
 * Identity similarity.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Similarity between 0 & 1.
 */
export function similarity(a, b) {
  if (typeof a === 'string')
    return a === b ? 1 : 0;

  if (a === b)
    return 1;

  if (a.length !== b.length)
    return 0;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      return 0;
  }

  return 1;
}
