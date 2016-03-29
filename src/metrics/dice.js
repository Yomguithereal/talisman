/**
 * Talisman metrics/dice
 * ======================
 *
 * Functions computing the Dice coefficient.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient
 *
 * [Article]:
 * Dice, Lee R. (1945). "Measures of the Amount of Ecologic Association
 * Between Species". Ecology 26 (3): 297–302.
 */
import tversky from './tversky';
import {bigrams} from '../stats/ngrams';

/**
 * Hashing the bigrams to be able to compare them referentially.
 */
const hasher = function(subsequence) {
  return subsequence.join('');
};

/**
 * Dice coefficient is just Tversky index with alpha = beta = 1 over the
 * sequences' bigrams.
 */
const dice = function(x, y) {

  // Shortcuts
  if (x === y)
    return 1;

  if (x.length === 1 && y.length === 1 && x !== y)
    return 0;

  // Computing the sequences' bigrams
  x = bigrams(x, hasher);
  y = bigrams(y, hasher);

  return tversky({alpha: 0.5, beta: 0.5}, x, y);
};

/**
 * Dice distance is 1 - the Dice index.
 */
const distance = (x, y) => 1 - dice(x, y);

/**
 * Exporting.
 */
export default dice;
export {
  dice as index,
  dice as similarity,
  distance
};
