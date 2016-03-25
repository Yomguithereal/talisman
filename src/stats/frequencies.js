/**
 * Talisman stats/frequencies
 * ===========================
 *
 * Functions related to sequences' frequencies.
 */
import {seq} from '../helpers';

/**
 * Function taking a sequence and computing its frequencies.
 *
 * @param  {mixed}  sequence - The sequence to process.
 * @return {object}          - A dict of the sequence's frequencies.
 *
 * @example
 *   // frequencies([1, 1, 2, 3, 3, 3]) => {1: 2, 2: 1, 3: 3}
 *   // frequencies('test') => {t: 2, e: 1, s: 1}
 */
function frequencies(sequence) {
  const index = {};

  // Handling strings
  sequence = seq(sequence);

  for (let i = 0, l = sequence.length; i < l; i++) {
    const element = sequence[i];

    if (!index[element])
      index[element] = 0;
    index[element]++;
  }

  return index;
}

/**
 * Relative version of the `frequencies` function.
 *
 * @param  {mixed}  sequence - The sequence to process.
 * @return {object}          - A dict of the sequence's relative frequencies.
 *
 * @example
 *   // frequencies([1, 1, 2, 3, 3, 3]) => {1: ~0.33, 2: ~0.16, 3: 0.5}
 *   // frequencies('test') => {t: 0.5, e: 0.25, s: 0.25}
 */
function relativeFrequencies(sequence) {
  const index = frequencies(sequence),
        relativeIndex = {};

  const length = sequence.length;

  for (const k in index)
    relativeIndex[k] = index[k] / length;

  return relativeIndex;
}

/**
 * Exporting
 */
export default frequencies;
export {
  frequencies as absolute,
  relativeFrequencies as relative
};
