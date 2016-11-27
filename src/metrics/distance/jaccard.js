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
 * [Tags]: metric.
 */
import tversky from './tversky';

/**
 * Jaccard index is just Tversky index with alpha = beta = 1.
 */
const jaccard = function(x, y) {
  if (x === y)
    return 1;
  return tversky({alpha: 1, beta: 1}, x, y);
};

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
