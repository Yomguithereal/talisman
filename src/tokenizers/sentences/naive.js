/**
 * Talisman tokenizers/sentences/naive
 * ====================================
 *
 * Naive algorithmic sentence tokenizer.
 */
import {SIMPLE_QUOTES, DOUBLE_QUOTES} from '../../regex/classes';

/**
 * Notable exceptions.
 */
const EXCEPTIONS = [
  'Mr',
  'Mrs',
  'Ms',
  'Mme',
  'Mlle',
  'Jr',
  'Dr',
  'Prof',
  'Sr',
  'Mgr',
  'St',
  'etc'
];

/**
 * Building the splitting regex.
 */
const REGEX = new RegExp([
  '([.?!…]+)',
    '([' + DOUBLE_QUOTES + '*_]?[*_]?)',
    '[\\s\\r\\n]+',
  '(?=[' + DOUBLE_QUOTES + SIMPLE_QUOTES + ']?[A-Z0-9])'
].join(''), 'g');

/**
 * Building additional regexes.
 */
const DOUBLE_QUOTES_REGEX = new RegExp('[' + DOUBLE_QUOTES + ']', 'g'),
      PAREN_REGEX = /[(){}\[\]]/g,
      LIST_REGEX = /^[A-Z0-9]\s?[.]\s*$/,
      PITFALL_REGEX = /^[A-Za-z0-9]\s*\)/;

/**
 * Function tokenizing raw text into sentences.
 *
 * @param  {string} text       - The text to tokenize.
 * @param  {array}  exceptions - An array of additional exceptions.
 * @return {array}             - The tokens.
 */
export default function tokenize(text, exceptions) {
  const initialTokens = text.replace(REGEX, '$1$2\x1E').split('\x1E'),
        correctTokens = [];

  // Building the exceptions regex
  exceptions = EXCEPTIONS
    .concat(exceptions || [])
    .map(e => e + '\\.')
    .join('|');

  const exceptionsRegex = new RegExp(`(${exceptions})$`);

  let memo = '',
      c;

  for (let i = 0, l = initialTokens.length; i < l; i++) {
    c = initialTokens[i];

    // Searching for exceptions
    if (i !== l - 1 &&
        ((exceptionsRegex.test(c)) ||
         (LIST_REGEX.test(c)) ||
         (!PITFALL_REGEX.test(c)) &&
         ((((memo + c).match(DOUBLE_QUOTES_REGEX) || []).length % 2 !== 0) ||
          (((memo + c).match(PAREN_REGEX) || []).length % 2 !== 0)))) {
      memo += (memo ? ' ' : '') + c;
      continue;
    }

    correctTokens.push(memo + (c && memo ? ' ' : '') + c);
    memo = '';
  }

  return correctTokens;
}
