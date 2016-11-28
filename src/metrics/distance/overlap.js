/**
 * Talisman metrics/distance/overlap
 * ==================================
 *
 * Function computing the overlap coefficient.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Overlap_coefficient
 *
 * [Tags]: metric, string metric.
 */

/**
 * Function returning the overlap coefficient between two sequences.
 *
 * @param  {mixed}  a     - The first sequence.
 * @param  {mixed}  b     - The second sequence.
 * @return {number}       - The overlap coefficient between a & b.
 */
export default function overlap(a, b) {

  if (a === b)
    return 1;

  a = new Set(a);
  b = new Set(b);

  // Computing intersection of both sets
  const i = new Set();

  a.forEach(item => {
    if (b.has(item))
      i.add(item);
  });

  return i.size / Math.min(a.size, b.size);
}
