/**
 * Talisman metrics/sorensen
 * ==========================
 *
 * Functions computing the Sorensen index. Note that Sorensen index is
 * actually the same as the Dice coefficient (metrics/dice).
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient
 *
 * [Article]:
 * Sørensen, T. (1948). "A method of establishing groups of equal amplitude in
 * plant sociology based on similarity of species and its application to
 * analyses of the vegetation on Danish commons".
 * Kongelige Danske Videnskabernes Selskab 5 (4): 1–34.
 *
 * [Tags]: semimetric, string metric.
 */
import dice, {distance} from './dice';

/**
 * The Sorensen index is the same as the Dice one.
 */
export default dice;
export {
  dice as index,
  dice as coefficient,
  dice as similarity,
  distance
};
