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
 *
 * [Tags]: metric, string metric.
 */
const VECTOR = [],
      CODES = [];

/**
 * Function returning the Levenshtein distance between two sequences. This
 * version only works on strings and leverage the `.charCodeAt` method to
 * perform fast comparisons between 16 bits integers.
 *
 * @param  {string}  a - The first string to process.
 * @param  {string}  b - The second string to process.
 * @return {number}    - The Levenshtein distance between a & b.
 */
function levenshteinForStrings(a, b) {
  if (a === b)
    return 0;

  const tmp = a;

  // Swapping the strings so that the shorter string is the first one.
  if (a.length > b.length) {
    a = b;
    b = tmp;
  }

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb;
  if (!lb)
    return la;

  // Ignoring common suffix
  // NOTE: ~- is a fast - 1 operation, it does not work on big number though
  while (la > 0 && (a.charCodeAt(~-la) === b.charCodeAt(~-lb))) {
    la--;
    lb--;
  }

  if (!la)
    return lb;

  let start = 0;

  // Ignoring common prefix
  while (start < la && (a.charCodeAt(start) === b.charCodeAt(start)))
    start++;

  la -= start;
  lb -= start;

  if (!la)
    return lb;

  const v0 = VECTOR;

  let i = 0;

  while (i < lb) {
    CODES[i] = b.charCodeAt(start + i);
    v0[i] = ++i;
  }

  let current = 0,
      left,
      above,
      charA,
      j;

  // Starting the nested loops
  for (i = 0; i < la; i++) {
    left = i;
    current = i + 1;

    charA = a.charCodeAt(start + i);

    for (j = 0; j < lb; j++) {
      above = current;

      current = left;
      left = v0[j];

      if (charA !== CODES[j]) {

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
 * Function returning the Levenshtein distance between two arbitrary sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The Levenshtein distance between a & b.
 */
export default function levenshtein(a, b) {

  // If the sequences are string, we use the optimized version
  if (typeof a === 'string')
    return levenshteinForStrings(a, b);

  if (a === b)
    return 0;

  const tmp = a;

  // Swapping the strings so that the shorter string is the first one.
  if (a.length > b.length) {
    a = b;
    b = tmp;
  }

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb;
  if (!lb)
    return la;

  // Ignoring common suffix
  // NOTE: ~- is a fast - 1 operation, it does not work on big number though
  while (la > 0 && (a[~-la] === b[~-lb])) {
    la--;
    lb--;
  }

  if (!la)
    return lb;

  let start = 0;

  // Ignoring common prefix
  while (start < la && (a[start] === b[start]))
    start++;

  la -= start;
  lb -= start;

  if (!la)
    return lb;

  const v0 = VECTOR;

  let i = 0;

  while (i < lb)
    v0[i] = ++i;

  let current = 0,
      left,
      above,
      charA,
      j;

  // Starting the nested loops
  for (i = 0; i < la; i++) {
    left = i;
    current = i + 1;

    charA = a[start + i];

    for (j = 0; j < lb; j++) {
      above = current;

      current = left;
      left = v0[j];

      if (charA !== b[start + j]) {

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
 * exceed a given maximum and return Infinity. This version only works on
 * strings and leverage the `.charCodeAt` method to perform fast comparisons
 * between 16 bits integers.
 *
 * @param  {number} max - Maximum distance.
 * @param  {string} a   - The first string to process.
 * @param  {string} b   - The second string to process.
 * @return {number}     - The Levenshtein distance between a & b or Infinity.
 */
function limitedLevenshteinForStrings(max, a, b) {
  if (a === b)
    return 0;

  const tmp = a;

  // Swapping the strings so that the shorter string is the first one.
  if (a.length > b.length) {
    a = b;
    b = tmp;
  }

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb > max ? Infinity : lb;
  if (!lb)
    return la > max ? Infinity : la;

  // Ignoring common suffix
  // NOTE: ~- is a fast - 1 operation, it does not work on big number though
  while (la > 0 && (a.charCodeAt(~-la) === b.charCodeAt(~-lb))) {
    la--;
    lb--;
  }

  if (!la)
    return lb > max ? Infinity : lb;

  let start = 0;

  // Ignoring common prefix
  while (start < la && (a.charCodeAt(start) === b.charCodeAt(start)))
    start++;

  la -= start;
  lb -= start;

  if (!la)
    return lb > max ? Infinity : lb;

  const diff = lb - la;

  if (max > lb)
    max = lb;
  else if (diff > max)
    return Infinity;

  const v0 = VECTOR;

  let i = 0;

  while (i < max) {
    CODES[i] = b.charCodeAt(start + i);
    v0[i] = ++i;
  }
  while (i < lb) {
    CODES[i] = b.charCodeAt(start + i);
    v0[i++] = max + 1;
  }

  const offset = max - diff,
        haveMax = max < lb;

  let jStart = 0,
      jEnd = max;

  let current = 0,
      left,
      above,
      charA,
      j;

  // Starting the nested loops
  for (i = 0; i < la; i++) {
    left = i;
    current = i + 1;

    charA = a.charCodeAt(start + i);
    jStart += (i > offset) ? 1 : 0;
    jEnd += (jEnd < lb) ? 1 : 0;

    for (j = jStart; j < jEnd; j++) {
      above = current;

      current = left;
      left = v0[j];

      if (charA !== CODES[j]) {

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

  // If the sequences are string, we use the optimized version
  if (typeof a === 'string')
    return limitedLevenshteinForStrings(max, a, b);

  if (a === b)
    return 0;

  const tmp = a;

  // Swapping the strings so that the shorter string is the first one.
  if (a.length > b.length) {
    a = b;
    b = tmp;
  }

  let la = a.length,
      lb = b.length;

  if (!la)
    return lb > max ? Infinity : lb;
  if (!lb)
    return la > max ? Infinity : la;

  // Ignoring common suffix
  // NOTE: ~- is a fast - 1 operation, it does not work on big number though
  while (la > 0 && (a[~-la] === b[~-lb])) {
    la--;
    lb--;
  }

  if (!la)
    return lb > max ? Infinity : lb;

  let start = 0;

  // Ignoring common prefix
  while (start < la && (a[start] === b[start]))
    start++;

  la -= start;
  lb -= start;

  if (!la)
    return lb > max ? Infinity : lb;

  const diff = lb - la;

  if (max > lb)
    max = lb;
  else if (diff > max)
    return Infinity;

  const v0 = VECTOR;

  let i = 0;

  while (i < max) {
    v0[i] = ++i;
  }
  while (i < lb) {
    v0[i++] = max + 1;
  }

  const offset = max - diff,
        haveMax = max < lb;

  let jStart = 0,
      jEnd = max;

  let current = 0,
      left,
      above,
      charA,
      j;

  // Starting the nested loops
  for (i = 0; i < la; i++) {
    left = i;
    current = i + 1;

    charA = a[start + i];
    jStart += (i > offset) ? 1 : 0;
    jEnd += (jEnd < lb) ? 1 : 0;

    for (j = jStart; j < jEnd; j++) {
      above = current;

      current = left;
      left = v0[j];

      if (charA !== b[start + j]) {

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
