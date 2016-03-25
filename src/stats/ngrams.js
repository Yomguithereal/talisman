/**
 * Talisman stats/ngrams
 * ======================
 *
 * Functions related to ngrams' computation.
 */
import {seq} from '../helpers';

/**
 * Function taking a sequence and computing its ngrams.
 *
 * @param  {number}  n        - Nb of elements in the subsequence.
 * @param  {mixed}   sequence - The sequence to process.
 * @return {array}            - The array of resulting ngrams.
 *
 * @throws {Error} The function expects a positive n > 0.
 */
export default function ngrams(n, sequence) {
  if (n < 1)
    throw Error('talisman/stats/ngrams: first argument should be a positive integer > 0.');

  sequence = seq(sequence);

  const subsequences = [];

  for (let i = 0, l = sequence.length; i < l - n + 1; i++) {
    const subsequence = [];

    for (let j = 0; j < n; j++)
      subsequence.push(sequence[i + j]);

    subsequences.push(subsequence);
  }

  return subsequences;
}

/**
 * Creating popular aliases.
 */
const bigrams = ngrams.bind(null, 2),
      trigrams = ngrams.bind(null, 3),
      quadrigrams = ngrams.bind(null, 4);

export {bigrams, trigrams, quadrigrams};
