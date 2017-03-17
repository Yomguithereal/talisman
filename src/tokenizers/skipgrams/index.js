/**
 * Talisman tokenizers/skipgrams
 * ==============================
 *
 * Functions related to skipgrams' computation.
 *
 * [Reference]: https://en.wikipedia.org/wiki/N-gram#Skip-gram
 */
import generatorics from 'generatorics';
import {seq} from '../../helpers';
import {vec} from '../../helpers/vectors';
import ngrams from '../ngrams';

/**
 * Sentinel object.
 */
const SENTINEL = {};

/**
 * Function taking a sequence and computing its skipgrams.
 *
 * @param  {number}   k      - Nb of elements to skip.
 * @param  {number}   n         - Nb of elements in the subsequence.
 * @param  {mixed}    sequence  - The sequence to process.
 * @return {array}              - The array of resulting skipgrams.
 *
 * @throws {Error} The function expects a positive k.
 * @throws {Error} The function expects a positive n > 0.
 * @throws {Error} n should be > k.
 */
export default function skipgrams(k, n, sequence) {
  if (k < 1)
    throw new Error('talisman/tokenizers/skipgrams: `k` should be a positive integer > 0.');

  if (n < 1)
    throw Error('talisman/tokenizers/skipgrams: `n` should be a positive integer > 0.');

  if (n < k)
    throw Error('talisman/tokenizers/skipgrams: `n` should be greater than `k`.');

  const isString = typeof sequence === 'string';

  sequence = seq(sequence);

  // NOTE: should be n or k?
  const padding = vec(n, SENTINEL);

  const subsequences = [],
        grams = ngrams(n + k, sequence.concat(padding));

  for (let i = 0, l = grams.length; i < l; i++) {
    const head = grams[i][0],
          tail = grams[i].slice(1);

    const iterator = generatorics.combination(tail, n - 1);

    let step;

    while ((step = iterator.next(), !step.done)) {
      const skipTail = step.value;

      if (skipTail[skipTail.length - 1] === SENTINEL)
        continue;

      if (isString)
        subsequences.push(head + skipTail.join(''));
      else
        subsequences.push([head].concat(skipTail));
    }
  }

  return subsequences;
}
