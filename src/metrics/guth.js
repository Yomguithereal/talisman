/**
 * Talisman metrics/guth
 * ======================
 *
 * Implementation of the Guth distance.
 *
 * [Article]:
 * Gloria J. A. Guth (1976) Surname Spellings and Computerized Record Linkage,
 * Historical Methods Newsletter, 10:1, 10-19
 * DOI: 10.1080/00182494.1976.10112645
 *
 * [Tags]: metric, vector space.
 */

/**
 * Function returning the Guth distance between two sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The Guth distance between a & b.
 */
export default function guth(a, b) {
  if (a === b)
    return 0;

  let tmp;

  // Swapping so that a is the shortest
  if (a.length > b.length) {
    tmp = a;
    a = b;
    b = tmp;
  }

  let d = 0;

  // Iterating
  for (let i = 0, la = a.length, lb = b.length; i < lb; i++) {

    // Early termination when b is really longer than a
    if (i > la + 1) {
      d += lb - i;
      break;
    }

    const match = (
      a[i] === b[i] ||
      (i + 1 < lb && a[i] === b[i + 1]) ||
      (i + 2 < lb && a[i] === b[i + 2]) ||
      (i && a[i] === b[i - 1]) ||
      (i && a[i - 1] === b[i]) ||
      (i + 1 < la && a[i + 1] === b[i]) ||
      (i + 2 < la && a[i + 2] === b[i]) ||
      (i + 1 < la && i + 1 < lb && a[i + 1] === b[i + 1]) ||
      (i + 2 < la && i + 2 < lb && a[i + 2] === b[i + 2])
    );

    if (!match)
      d++;
  }

  return d;
}
