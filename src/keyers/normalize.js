/* eslint no-control-regex: 0 */
/**
 * Talisman keyers/normalize
 * ==========================
 *
 * Generic function used to normalize strings to make them a good basis for
 * fuzzy comparisons.
 */
import deburr from 'lodash/deburr';
import {
  SINGLE_QUOTES as SINGLE_QUOTES_CLASS,
  DOUBLE_QUOTES as DOUBLE_QUOTES_CLASS
} from '../regexp/classes';

/**
 * Regular expressions.
 */
const CONTROL_CHARACTERS = new RegExp('[\\x00-\\x08\\x0A-\\x1F\\x7F]', 'g'),
      SINGLE_QUOTES = new RegExp(`[${SINGLE_QUOTES_CLASS}]`, 'g'),
      DOUBLE_QUOTES = new RegExp(`[${DOUBLE_QUOTES_CLASS}]`, 'g'),
      WHITESPACE_COMPRESSION = /\s+/g;

const CONVERSIONS = [
  [/…/g, '...'],
  [/æ/g, 'ae'],
  [/œ/g, 'oe'],
  [/ß/g, 'ss']
];

/**
 * Function creating a normalizer function.
 *
 * @param  {object}  params        - Options:
 * @param  {boolean}   keepAccents - Whether to keep accents.
 * @param  {boolean}   keepCase    - Whether to keep the case.
 * @return {function}
 */
export function createNormalizer(params) {
  params = params || {};

  const keepAccents = params.keepAccents === true,
        keepCase = params.keepCase === true;

  /**
   * Function returning a normalized string.
   *
   * @param  {string} string - String to normalize.
   * @return {string}
   */
  return function normalizer(string) {
    if (!keepCase)
      string = string.toLowerCase();

    string = string
      .trim()
      .replace(WHITESPACE_COMPRESSION, ' ')
      .replace(CONTROL_CHARACTERS, '')
      .replace(SINGLE_QUOTES, '\'')
      .replace(DOUBLE_QUOTES, '"');

    for (let i = 0, l = CONVERSIONS.length; i < l; i++) {
      const pattern = CONVERSIONS[i][0],
            replacement = CONVERSIONS[i][1];

      string = string.replace(pattern, replacement);
    }

    if (!keepAccents)
      string = deburr(string);

    return string;
  };
}

export default createNormalizer();
