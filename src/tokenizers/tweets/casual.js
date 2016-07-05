/**
 * Talisman tokenizers/tweets/casual
 * ==================================
 *
 * Implementation of the Casual tweets tokenizer from the nltk project.
 *
 * [Reference]:
 * http://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize.casual
 *
 * [Authors]:
 * Christopher Potts
 * Ewan Klein
 * Pierpaolo Pantone
 */
import {findall} from '../../helpers';
import {AllHtmlEntities} from 'html-entities';

const ENTITIES = new AllHtmlEntities();

/**
 * Regexes.
 */
const EMOTICONS = [
  '(?:',
      '[<>]?',
      '[:;=8]',
      '[\\-o*\']?',
      '[)\\](\\[dDpP/:}{@|\]',
    '|',
      '[)\\](\\[dDpP/:}{@|\]',
      '[\\-o*\']?',
      '[:;=8]',
      '[<>]?',
    '|',
      '<3',
  ')'
].join('');

// URL pattern due to John Gruber, modified by Tom Winzig. See
// https://gist.github.com/winzig/8894715
const URLS = [
  '(?:',
    'https?:',
    '(?:',
      '\\/{1,3}',
      '|',
      '[a-z0-9%]',
    ')',
    '|',
    '[a-z0-9.\\-]+[.]',
    '(?:[a-z]{2,13})',
    '\\/',
  ')',
  '(?:',
    '[^\\s()<>{}\\[\\]]+',
    '|',
    '\\([^\\s()]*?\\([^\\s()]+\\)[^\\s()]*?\\)',
    '|',
    '\\([^\\s]+?\\)',
  ')+',
  '(?:',
    '\\([^\\s()]*?\\([^\\s()]+\\)[^\\s()]*?\\)',
    '|',
    '\\([^\\s]+?\\)',
    '|',
    '[^\\s`!()\\[\\]{};:\'".,<>?«»“”‘’]',
  ')',
  '|',
  '(?:',
    // NOTE: Lookbehind doesn't work in JavaScript. Skipping this for now.
    // '(?<!@)',
    '[a-z0-9]+',
    '(?:[.\\-][a-z0-9]+)*',
    '[.]',
    '(?:[a-z]{2,13})',
    '\\b',
    '\\/?',
    '(?!@)',
  ')'
].join('');

const REGEXPS = [
  URLS,

  // Phone numbers
  [
    '(?:',
      '(?:',
        '\\+?[01]',
        '[\\-\\s.]*',
      ')?',
      '(?:',
        '[\\(]?',
        '\\d{3}',
        '[\\-\\s.)]*',
      ')?',
      '\\d{3}',
      '[\\-\\s.]*',
      '\\d{4}',
    ')'
  ].join(''),
  EMOTICONS,

  // HTML Tags
  '<[^>\\s]+>',

  // ASCII Arrows
  '[\\-]+>|<[\\-]+',

  // Twitter Usernames
  '(?:@[\\w_]+)',

  // Twitter hashtags
  '(?:\\#+[\\w_]+[\\w\'_\\-]*[\\w_]+)',

  // Email addresses
  '[\\w.+-]+@[\\w-]+\\.(?:[\\w-]\\.?)+[\\w-]',

  // Remaining word types
  [
    '(?:[^\\W\\d_](?:[^\\W\\d_]|[\'\\-_])+[^\\W\\d_])',
    '|',
    '(?:[+\\-]?\d+[,/.:-]\\d+[+\\-]?)',
    '|',
    '(?:[\\w_]+)',
    '|',
    '(?:\\.(?:\\s*\\.){1,})',
    '|',
    '(?:\\S)'
  ].join('')
];

// NOTE: build unicode support

const WORD_RE = new RegExp(`(${REGEXPS.join('|')})`, 'ig'),
      HANG_RE = /([^a-zA-Z0-9])\1{3,}/g;

/**
 * Function a single tweet into a sequence of tokens.
 *
 * @param  {string} tweet - The tweet to tokenize.
 * @return {array}        - The tokens.
 */
export default function(tweet) {

  // Fixing HTML entities
  tweet = ENTITIES.decode(tweet);

  // Shorten problematic sequences of characters
  const safeText = tweet.replace(HANG_RE, '$1$1$1');

  // Actual tokenizing
  const matches = findall(WORD_RE, safeText);

  const tokens = new Array(matches.length);

  for (let i = 0, l = matches.length; i < l; i++)
    tokens[i] = matches[i][0];

  return tokens;
}
