/**
 * Talisman stats/frequencies
 * ===========================
 *
 * Exporting a function taking a sequence and computing the frequencies of this
 * sequence.
 *
 * @param  {mixed}  sequence - The sequence to process.
 * @return {object}          - A dict of the sequence's frequencies.
 *
 * @example
 *   // frequencies([1, 1, 2, 3, 3, 3]) => {1: 2, 2: 1, 3: 3}
 *   // frequencies('test') => {t: 2, e: 1, s: 1}
 */
export default function frequencies(sequence) {
  const index = {};

  for (const element of sequence) {
    if (!index[element])
      index[element] = 0;
    index[element]++;
  }

  return index;
}
