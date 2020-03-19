/**
 * Talisman metrics/ratcliff-obershelp
 * ====================================
 *
 * Function computing the Ratcliff-Obershelp similarity/distance.
 *
 * [References]:
 * https://xlinux.nist.gov/dads/HTML/ratcliffObershelp.html
 * http://collaboration.cmc.ec.gc.ca/science/rpn/biblio/ddj/Website/articles/DDJ/1988/8807/8807c/8807c.htm
 *
 * [Articles]:
 * PATTERN MATCHING: THE GESTALT APPROACH
 * John W. Ratcliff, David E. Metzener
 *
 * Paul E. Black, "Ratcliff/Obershelp pattern recognition", in Dictionary of
 * Algorithms and Data Structures [online], Vreda Pieterse and Paul E. Black,
 * eds. 17 December 2004.
 *
 * [Tags]: string metric.
 */
import {GeneralizedSuffixArray} from 'mnemonist/suffix-array';

/**
 * Abstract indexOf helper needed to find the given subsequence's starting
 * index in the given sequence. Note that this function may seem naive
 * because it misses cases when, for instance, the subsequence is not found
 * but this is of no concern because we use the function in cases when it's
 * not possible that the subsequence is not found.
 *
 * @param  {mixed}  haystack - Target sequence.
 * @param  {mixed}  needle   - Subsequence to find.
 * @return {number}          - The starting index.
 */
function indexOf(haystack, needle) {
  if (typeof haystack === 'string')
    return haystack.indexOf(needle);

  for (let i = 0, j = 0, l = haystack.length, n = needle.length; i < l; i++) {
    if (haystack[i] === needle[j]) {
      j++;

      if (j === n)
        return i - j + 1;
    }
    else {
      j = 0;
    }
  }

  return -1;
}

/**
 * Function returning the number of Ratcliff-Obershelp matches. This works
 * by finding the LCS of both strings before recursively finding the LCS
 * of the substrings both before and after the LCS in the initial strings and
 * so on...
 *
 * @param  {mixed}  a  - The first sequence to process.
 * @param  {mixed}  b  - The second sequence to process.
 * @return {number}    - The number of matches.
 */
function matches(a, b) {
  const stack = [a, b];

  let m = 0;

  while (stack.length) {
    a = stack.pop();
    b = stack.pop();

    if (!a.length || !b.length)
      continue;

    const lcs = (new GeneralizedSuffixArray([a, b]).longestCommonSubsequence()),
          length = lcs.length;

    if (!length)
      continue;

    // Increasing matches
    m += length;

    // Add to the stack
    const aStart = indexOf(a, lcs),
          bStart = indexOf(b, lcs);

    stack.push(a.slice(0, aStart), b.slice(0, bStart));
    stack.push(a.slice(aStart + length), b.slice(bStart + length));
  }

  return m;
}

/**
 * Function returning the Ratcliff-Obershelp similarity between two sequences.
 *
 * @param  {mixed}  a  - The first sequence to process.
 * @param  {mixed}  b  - The second sequence to process.
 * @return {number}    - The Ratcliff-Obershelp similarity between a & b.
 */
export function similarity(a, b) {
  if (a === b)
    return 1;

  if (!a.length || !b.length)
    return 0;

  return 2 * matches(a, b) / (a.length + b.length);
}

/**
 * Function returning the Ratcliff-Obershelp distance between two sequences.
 *
 * @param  {mixed}  a  - The first sequence to process.
 * @param  {mixed}  b  - The second sequence to process.
 * @return {number}    - The Ratcliff-Obershelp distance between a & b.
 */
export function distance(a, b) {
  return 1 - similarity(a, b);
}
