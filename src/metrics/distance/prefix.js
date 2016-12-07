/**
 * Talisman metrics/distance/prefix
 * =================================
 *
 * Function computing the Prefix distance/similarity. This is basically the
 * ratio of the length of the common prefix to the length of the shortest
 * sequence.
 *
 * [Tags]: metric, string metric.
 */

/**
 * Prefix similarity.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Similarity between 0 & 1.
 */
export function similarity(a, b) {
  if (a === b)
    return 1;

  if (!a.length || !b.length)
    return 0;

  if (a.length > b.length)
    [a, b] = [b, a];

  let i = 0;

  const l = a.length;

  for (; i < l; i++) {
    if (a[i] !== b[i])
      break;
  }

  return i / l;
}

/**
 * Prefix distance.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Distance between 0 & 1.
 */
export function distance(a, b) {
  return 1 - similarity(a, b);
}
