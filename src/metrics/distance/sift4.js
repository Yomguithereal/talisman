/**
 * Talisman metrics/distance/sif4
 * ===============================
 *
 * Implementation of the SIFT4 distance which is a linear time approximation of
 * the Levenshtein or Damerau-Levenshtein distance.
 *
 * [Reference]:
 * https://siderite.blogspot.com/2014/11/super-fast-and-accurate-string-distance.html
 *
 * [Author]: Siderite Zackwehdex
 *
 * [Tags]: string metric, asymmetric.
 */

// TODO: implement options of the most complex version.

/**
 * Defaults.
 */
const DEFAULTS = {
  transpositions: false,
  maxOffset: 5
};

/**
 * Simplest version of the SIFT4 algorithm.
 *
 * @param  {number}       maxOffset   - Search window.
 * @param  {number}       maxDistance - Maximum distance before exiting.
 * @param  {string|array} a           - First sequence.
 * @param  {string|array} b           - Second sequence.
 * @return {number}                   - The distance.
 */
function withoutTranspositions(maxOffset, maxDistance, a, b) {
  // Early termination
  if (a === b)
    return 0;

  const la = a.length,
        lb = b.length;

  if (!la || !lb)
    return Math.max(la, lb);

  let cursorA = 0,
      cursorB = 0,
      longestCommonSubsequence = 0,
      localCommonSubstring = 0;

  while (cursorA < la && cursorB < lb) {
    if (a[cursorA] === b[cursorB]) {
      localCommonSubstring++;
    }
    else {
      longestCommonSubsequence += localCommonSubstring;
      localCommonSubstring = 0;

      if (cursorA !== cursorB)
        cursorA = cursorB = Math.max(cursorA, cursorB);

      for (let i = 0; i < maxOffset && (cursorA + i < la || cursorB + i < lb); i++) {
        if (cursorA + i < la && a[cursorA + i] === b[cursorB]) {
          cursorA += i;
          localCommonSubstring++;
          break;
        }

        if (cursorB + i < lb && a[cursorA] === b[cursorB + i]) {
          cursorB += i;
          localCommonSubstring++;
          break;
        }
      }
    }

    cursorA++;
    cursorB++;

    if (maxDistance) {
      const tempDistance = Math.max(cursorA, cursorB) - longestCommonSubsequence;

      if (tempDistance === maxDistance)
        return maxDistance;

      if (tempDistance > maxDistance)
        return Infinity;
    }
  }

  longestCommonSubsequence += localCommonSubstring;

  return Math.max(la, lb) - longestCommonSubsequence;
}

/**
 * Version of the SIFT4 function computing transpositions.
 *
 * @param  {number}       maxOffset   - Search window.
 * @param  {number}       maxDistance - Maximum distance before exiting.
 * @param  {string|array} a           - First sequence.
 * @param  {string|array} b           - Second sequence.
 * @return {number}                   - The distance.
 */
function withTranspositions(maxOffset, maxDistance, a, b) {

  // Early termination
  if (a === b)
    return 0;

  const la = a.length,
        lb = b.length;

  if (!la || !lb)
    return Math.max(la, lb);

  let cursorA = 0,
      cursorB = 0,
      longestCommonSubsequence = 0,
      localCommonSubstring = 0,
      transpositions = 0;

  const offsetArray = [];

  while (cursorA < la && cursorB < lb) {

    if (a[cursorA] === b[cursorB]) {
      localCommonSubstring++;

      let isTransposition = false,
          i = 0;

      while (i < offsetArray.length) {
        const offset = offsetArray[i];

        if (cursorA <= offset.cursorA || cursorB <= offset.cursorB) {

          isTransposition = Math.abs(cursorB - cursorA) >= Math.abs(offset.cursorB - offset.cursorA);

          if (isTransposition) {
            transpositions++;
          }
          else {
            if (!offset.isTransposition) {
              offset.isTransposition = true;
              transpositions++;
            }
          }

          break;
        }

        else {

          // NOTE: we could marginally enhance the performance of the algo
          // by using an object rather than splicing the array
          if (cursorA > offset.cursorB && cursorB > offset.cursorA)
            offsetArray.splice(i, 1);
          else
            i++;
        }
      }

      offsetArray.push({
        cursorA,
        cursorB,
        isTransposition
      });
    }

    else {
      longestCommonSubsequence += localCommonSubstring;
      localCommonSubstring = 0;

      if (cursorA !== cursorB)
        cursorA = cursorB = Math.min(cursorA, cursorB);

      for (let i = 0; i < maxOffset && (cursorA + i < la || cursorB + i < lb); i++) {

        if ((cursorA + i < la) && a[cursorA + i] === b[cursorB]) {
          cursorA += i - 1;
          cursorB--;
          break;
        }

        if ((cursorB + i < lb) && a[cursorA] === b[cursorB + i]) {
          cursorA--;
          cursorB += i - 1;
          break;
        }
      }
    }

    cursorA++;
    cursorB++;

    // NOTE: this was below maxDistance check in original implemenation but
    // this looked suspicious
    if (cursorA >= la || cursorB >= lb) {
      longestCommonSubsequence += localCommonSubstring;
      localCommonSubstring = 0;
      cursorA = cursorB = Math.min(cursorA, cursorB);
    }

    if (maxDistance) {
      const tempDistance = (
        Math.max(cursorA, cursorB) -
        longestCommonSubsequence +
        transpositions
      );

      if (tempDistance === maxDistance)
        return maxDistance;

      if (tempDistance > maxDistance)
        return Infinity;
    }
  }

  longestCommonSubsequence += localCommonSubstring;

  return Math.max(la, lb) - longestCommonSubsequence + transpositions;
}

/**
 * Function computing the SIFT4 distance.
 *
 * @param  {object}       options         - Options:
 * @param  {boolean}        [symmetric]   - Symmetric version of the algorithm.
 * @param  {number}         [maxOffset]   - Search window.
 * @param  {number}         [maxDistance] - Maximum distance before exiting.
 * @param  {string|array} a               - First sequence.
 * @param  {string|array} b               - Second sequence.
 * @return {number}                       - The distance.
 */
export function custom(options, a, b) {
  const maxOffset = options.maxOffset || DEFAULTS.maxOffset,
        maxDistance = options.maxDistance,
        transpositions = options.transpositions === true,
        symmetric = options.symmetric === true;

  const fn = transpositions ? withTranspositions : withoutTranspositions,
        distance = fn(maxOffset, maxDistance, a, b);

  if (symmetric) {
    const reversedDistance = fn(maxOffset, maxDistance, b, a);

    return Math.min(distance, reversedDistance);
  }

  return distance;
}

/**
 * Exporting default function.
 */
const sift4 = custom.bind(null, {});
export default sift4;
