/**
 * Talisman metrics/overlap
 * =========================
 *
 * Function computing the overlap coefficient.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Overlap_coefficient
 *
 * [Tags]: metric, string metric.
 */

/**
 * Global sets used by the overlap function. This way, we don't need to
 * create objects when computing the coefficient.
 */
let A = new Set(),
    B = new Set();

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

  if (!a || !b)
    return 0;

  A.clear();
  B.clear();

  for (let i = 0, l = a.length; i < l; i++)
    A.add(a[i]);
  for (let i = 0, l = b.length; i < l; i++)
    B.add(b[i]);

  let tmp;

  // Let's find the shortest set
  if (A.size > B.size) {
    tmp = A;
    A = B;
    B = tmp;
  }

  // Computing intersection of both sets
  let I = 0;

  A.forEach(item => {
    if (B.has(item))
      I++;
  });

  return I / A.size;
}
