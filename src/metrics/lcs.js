/**
 * Talisman metrics/lcs
 * =====================
 *
 * Function computing the Longest Common Subsequence distance/similarity.
 *
 * [Tags]: metric, string metric.
 */
import {GeneralizedSuffixArray} from 'mnemonist/suffix-array';

/**
 * LCS similarity.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Similarity between 0 & 1.
 */
export function similarity(a, b) {
  if (a === b)
    return 1;

  const la = a.length,
        lb = b.length;

  if (!la || !lb)
    return 0;

  const gst = new GeneralizedSuffixArray([a, b]),
        lcs = gst.longestCommonSubsequence().length;

  return lcs / Math.max(la, lb);
}

/**
 * LCS distance.
 *
 * @param  {array|string} a - First sequence.
 * @param  {array|string} b - Second sequence.
 * @param  {number}         - Distance between 0 & 1.
 */
export function distance(a, b) {
  return 1 - similarity(a, b);
}
