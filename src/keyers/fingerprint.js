/**
 * Talisman keyers/fingerprint
 * ============================
 *
 * Keyer based on the fingerprint tokenizer.
 */
import {createTokenizer} from '../tokenizers/fingerprint';

export function createKeyer(options) {
  options = options || {};

  const tokenizer = createTokenizer(options);

  return function(n, string) {
    if (options.ngrams)
      return tokenizer(n, string).join('');

    return tokenizer(n).join(' ');
  };
}

export default createKeyer();

const ngramsFingerprint = createKeyer({ngrams: true});

export {ngramsFingerprint};
