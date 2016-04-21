/**
 * Talisman metrics/levenshtein
 * =============================
 *
 * Functions computing the Levenshtein distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Levenshtein_distance
 *
 * [Article]:
 * Levenshtein, Vladimir I. (February 1966). "Binary codes capable of
 * correcting deletions, insertions, and reversals".
 * Soviet Physics Doklady 10 (8): 707–710.
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

  const previousRow = new Array(b.length + 1);

  for (let i = 0, l = previousRow.length; i < l; i++)
    previousRow[i] = i;

  let nextColumn,
      currentColumn,
      buffer,
      j;

  for (let i = 0, l = a.length; i < l; i++) {
    nextColumn = i + 1;

    const m = b.length;
    for (j = 0; j < m; j++) {
      currentColumn = nextColumn;

      // Substitution
      nextColumn = previousRow[j] + (a[i] === b[j] ? 0 : 1);

      // Insertion
      buffer = currentColumn + 1;
      if (nextColumn > buffer)
        nextColumn = buffer;

      // Deletion
      buffer = previousRow[j + 1] + 1;
      if (nextColumn > buffer)
        nextColumn = buffer;

      previousRow[j] = currentColumn;
    }

    previousRow[j] = nextColumn;
  }

  return nextColumn;
}

/**
 * Alternative export.
 */
export {levenshtein as distance};
