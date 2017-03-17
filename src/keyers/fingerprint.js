/**
 * Talisman keyers/fingerprint
 * ============================
 *
 * Keyer based on the fingerprint tokenizer.
 */
import {createTokenizer} from '../tokenizers/fingerprint';
import nameFingerprintTokenizer from '../tokenizers/fingerprint/name';

export function createKeyer(options) {
  options = options || {};

  const tokenizer = createTokenizer(options);

  if (options.ngrams)
    return (n, string) => tokenizer(n, string).join('');

  return string => tokenizer(string).join(' ');
}

export default createKeyer();

const ngramsFingerprint = createKeyer({ngrams: true});

const nameFingerprint = name => nameFingerprintTokenizer(name).join(' ');

export {ngramsFingerprint, nameFingerprint};
