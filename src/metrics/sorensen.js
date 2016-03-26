/**
 * Talisman metrics/sorensen
 * ==========================
 *
 * Functions computing the Sorensen coefficient.
 */
import dice, {index, similarity, distance} from './dice';

/**
 * The Sorensen index is the same as the Dice one.
 */
export default dice;
export {
  index,
  similarity,
  distance
};
