/**
 * Talisman metrics/distance/jaccard
 * ==================================
 *
 * Functions computing the Jaccard distance/similarity.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Jaccard_index
 *
 * [Article]:
 * Jaccard, Paul (1912), "The distribution of the flora in the alpine zone",
 * New Phytologist 11: 37–50
 *
 * [Tags]: metric, string metric.
 */

/**
 * Function returning the Jaccard similarity score between two sequences.
 *
 * @param  {mixed}  a - The first sequence.
 * @param  {mixed}  b - The second sequence.
 * @return {number}   - The Jaccard similarity score between a & b.
 */
function jaccard(a, b) {
  if (a === b)
    return 1;

  const la = a.length,
        lb = b.length;

  if (!la || !lb)
    return 0;

  const setA = {},
        setB = {};

  let I = 0,
      sizeA = 0,
      sizeB = 0;

  for (let i = 0; i < la; i++) {
    if (!setA.hasOwnProperty(a[i])) {
      setA[a[i]] = true;
      sizeA++;
    }
  }

  for (let i = 0; i < lb; i++) {
    if (!setB.hasOwnProperty(b[i])) {
      setB[b[i]] = true;
      sizeB++;

      if (setA.hasOwnProperty(b[i]))
        I++;
    }
  }

  // Size of the union is sum of size of both sets minus intersection
  const U = sizeA + sizeB - I;

  return I / U;
}

/**
 * Jaccard distance is 1 - the Jaccard index.
 */
const distance = (x, y) => 1 - jaccard(x, y);

/**
 * Exporting.
 */
export default jaccard;
export {
  jaccard as index,
  jaccard as similarity,
  distance
};
