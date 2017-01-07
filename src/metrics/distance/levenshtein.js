/**
 * Talisman metrics/distance/levenshtein
 * ======================================
 *
 * Functions computing the Levenshtein distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Levenshtein_distance
 *
 * [Article]:
 * Levenshtein, Vladimir I. (February 1966). "Binary codes capable of
 * correcting deletions, insertions, and reversals".
 * Soviet Physics Doklady 10 (8): 707–710.
 *
 * [Tags]: metric, string metric.
 */

/**
 * Function returning the Levenshtein distance between two sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The Levenshtein distance between a & b.
 */
export default function levenshtein(a, b) {
  if (a === b)
    return 0;

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb;
  if (!lb)
    return la;

  // Swapping the strings so that the shorter string is the first one.
  if (la > lb) {
    [a, b] = [b, a];
    [la, lb] = [lb, la];
  }

  // Ignoring common suffix
  while (la > 0 && (a[la - 1] === b[lb - 1])) {
    la--;
    lb--;
  }

  let start = 0;

  // If a common prefix exists of if a is a full b suffix
  if (a[0] === b[0] || !la) {

    // Common prefix can also be ignored
    while (start < la && a[start] === b[start])
      start++;

    la -= start;
    lb -= start;

    if (!la)
      return lb;

    b = b.slice(start, start + lb);
  }

  const v0 = new Array(lb),
        v2 = new Array(lb);

  for (let i = 0; i < lb; i++)
    v0[i] = i + 1;

  let current = 0;

  // Starting the nested loops
  for (let i = 0; i < la; i++) {
    let left = i;

    current = i + 1;
    const charA = a[start + i];

    for (let j = 0; j < lb; j++) {
      const above = current;

      const charB = b[j];
      v2[j] = current = left;
      left = v0[j];

      if (charA !== charB) {

        // Insertion
        if (left < current)
          current = left;

        // Deletion
        if (above < current)
          current = above;

        current++;
      }

      v0[j] = current;
    }
  }

  return current;
}

/**
 * Function returning the Levenshtein distance between two sequences
 * but with a twist: this version will stop its computation if distance
 * exceed a given maximum and return Infinity.
 *
 * @param  {number} max - Maximum distance.
 * @param  {mixed}  a   - The first sequence to process.
 * @param  {mixed}  b   - The second sequence to process.
 * @return {number}     - The Levenshtein distance between a & b or Infinity.
 */
export function limited(max, a, b) {
  if (a === b)
    return 0;

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb > max ? Infinity : lb;
  if (!lb)
    return la > max ? Infinity : la;

  // Swapping the strings so that the shorter string is the first one.
  if (la > lb) {
    [a, b] = [b, a];
    [la, lb] = [lb, la];
  }

  // Ignoring common suffix
  while (la > 0 && (a[la - 1] === b[lb - 1])) {
    la--;
    lb--;
  }

  let start = 0;

  // If a common prefix exists of if a is a full b suffix
  if (a[0] === b[0] || !la) {

    // Common prefix can also be ignored
    while (start < la && a[start] === b[start])
      start++;

    la -= start;
    lb -= start;

    if (!la)
      return lb > max ? Infinity : lb;

    b = b.slice(start, start + lb);
  }

  const diff = lb - la;

  if (max > lb)
    max = lb;
  else if (diff > max)
    return Infinity;

  const v0 = new Array(lb),
        v2 = new Array(lb);

  let i;
  for (i = 0; i < max; i++)
    v0[i] = i + 1;
  for (; i < lb; i++)
    v0[i] = max + 1;

  const offset = max - diff,
        haveMax = max < lb;

  let jStart = 0,
      jEnd = max;

  let current = 0;

  // Starting the nested loops
  for (i = 0; i < la; i++) {
    let left = i;

    current = i + 1;
    const charA = a[start + i];
    jStart += (i > offset) ? 1 : 0;
    jEnd += (jEnd < lb) ? 1 : 0;

    for (let j = jStart; j < jEnd; j++) {
      const above = current;

      const charB = b[j];
      v2[j] = current = left;
      left = v0[j];

      if (charA !== charB) {

        // Insertion
        if (left < current)
          current = left;

        // Deletion
        if (above < current)
          current = above;

        current++;
      }

      v0[j] = current;
    }

    if (haveMax && v0[i + diff] > max)
      return Infinity;
  }

  return current <= max ? current : Infinity;
}
