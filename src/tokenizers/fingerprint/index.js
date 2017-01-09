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
import {escapeRegexp} from '../../regexp';

/**
 * Constants.
 */
const WHITESPACE = /\s+/g,
      DIGITS = /\d/g,
      PUNCTUATION_CONTROL = new RegExp('[\\u2000-\\u206F\\u2E00-\\u2E7F\'!"#$%&()*+,\\-.\\/:;<=>?@\\[\\]^_`{|}~\\x00-\\x08\\x0A-\\x1F\\x7F]', 'g');

/**
 * Defaults.
 */
const DEFAULTS = {
  digits: true,
  minTokenSize: 1,
  ngrams: false,
  sort: true,
  split: null,
  stopwords: null
};

/**
 * Tokenizer function factory aiming at building the required function.
 *
 * @param  {object}   options        - Possible options:
 * @param  {boolean}    digits       - Whether to keep digits.
 * @param  {number}     minTokenSize - Minimum token size.
 * @param  {number}     ngrams       - Tokenize ngrams rather than words.
 * @param  {array}      split        - List of token-splitting characters.
 * @param  {array}      stopwords    - List of stopwords.
 * @return {function}                - The tokenizer function.
 */
export function createTokenizer(options) {
  options = options || {};

  const n = options.ngrams || DEFAULTS.ngrams,
        stripDigits = options.digits === false || !DEFAULTS.digits,
        minTokenSize = options.minTokenSize || DEFAULTS.minTokenSize,
        dontSort = options.sort === false;

  let stopwords = options.stopwords || DEFAULTS.stopwords;

  // Compiling stopwords
  if (stopwords)
    stopwords = new RegExp(
      '(?:' +
      stopwords.map(word => `\\b${escapeRegexp(word)}\\b`).join('|') +
      ')',
      'gi'
    );

  let split = options.split || DEFAULTS.split;

  // Compiling split
  if (split)
    split = new RegExp(
      `[${escapeRegexp(split.join(''))}]`,
      'g'
    );

  let sizeFilter;
  if (minTokenSize > 1)
    sizeFilter = new RegExp(`\\b\\S{1,${minTokenSize}}\\b`, 'g');

  // Returning the function
  return function(string) {

    //-- Splitting
    if (split)
      string = string.replace(split, ' ');

    //-- Stopwords
    if (stopwords)
      string = string.replace(stopwords, '');

    //-- Digits
    if (stripDigits)
      string = string.replace(DIGITS, '');

    //-- Case normalization
    string = string.toLowerCase();

    //-- Minimum token size
    if (sizeFilter)
      string = string.replace(sizeFilter, '');

    //-- Dropping punctuation & control characters
    string = string.replace(PUNCTUATION_CONTROL, '');

    //-- Deburring
    string = deburr(string);

    //-- Trimming
    string = string.trim();

    //-- Tokenizing
    let tokens;

    if (!n)
      tokens = string.split(WHITESPACE);
    else
      tokens = ngrams(n, string.replace(WHITESPACE, ''));

    //-- Keeping only unique tokens
    tokens = uniq(tokens);

    //-- Sorting tokens
    if (!dontSort)
      tokens.sort();

    return tokens;
  };
}

export default createTokenizer();
