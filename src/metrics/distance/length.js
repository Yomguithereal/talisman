/**
 * Talisman metrics/distance/length
 * =================================
 *
 * Length distance/similarity. Basically just the ratio of the shorter length
 * over the longer length.
 *
 * [Tags]: metric, string metric.
 */

/**
 * Length similarity.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 */
export function similarity(a, b) {
  if (a === b)
    return 1;

  const la = a.length,
        lb = b.length;

  if (!la || !lb)
    return 0;

  if (la < lb)
    return la / lb;

  return lb / la;
}

/**
 * Length distance.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 */
export function distance(a, b) {
  return 1 - similarity(a, b);
}
