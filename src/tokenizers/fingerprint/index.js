/* eslint no-control-regex: 0 */
/**
 * Talisman tokenizers/fingerprint
 * ================================
 *
 * Fingerprint tokenizer aiming at outputing meaningful sorted tokens for the
 * given string which can later be used for similarity measures.
 */
import deburr from 'lodash/deburr';
import uniq from 'lodash/uniq';
import ngrams from '../ngrams';

/**
 * Constants.
 */
const WHITESPACE = /\s+/,
      PUNCTUATION_CONTROL = new RegExp('[\\u2000-\\u206F\\u2E00-\\u2E7F\'!"#$%&()*+,\\-.\\/:;<=>?@\\[\\]^_`{|}~\\x00-\\x08\\x0A-\\x1F\\x7F]', 'g');

/**
 * Defaults.
 */
const DEFAULTS = {
  ngrams: false
};

/**
 * Tokenizer function factory aiming at building the required function.
 *
 * @param  {object}   options              - Possible options:
 * @return {function}                      - The tokenizer function.
 */
export function createTokenizer(options) {
  options = options || {};

  const n = options.ngrams || DEFAULTS.ngrams;

  // Returning the function
  return function(string) {

    //-- Trimming
    string = string.trim();

    //-- Case normalization
    string = string.toLowerCase();

    //-- Deburring
    string = deburr(string);

    //-- Dropping punctuation & control characters
    string = string.replace(PUNCTUATION_CONTROL, '');

    //-- Splitting the string into space-separated tokens
    let tokens;

    if (!n)
      tokens = string.split(WHITESPACE);
    else
      tokens = ngrams(n, string.replace(WHITESPACE, ''));

    //-- Keeping only unique tokens
    tokens = uniq(tokens);

    //-- Sorting tokens
    tokens.sort();

    return tokens;
  };
}

export default createTokenizer();
