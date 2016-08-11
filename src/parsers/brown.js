/**
 * Talisman parsers/brown
 * =======================
 *
 * A parser for Brown corpus files.
 */
const TOKEN_REGEX = /([^/\n\t\r\s]+)\/([^\s\n]+)/g;

/**
 * Function taking text from the Brown corpus and outputting an array of
 * (word, tag) tuples.
 *
 * @param  {string} text - The text to parse.
 * @return {array}       - The tokens.
 */
export default function brown(text) {
  const tokens = [];
  let match;

  while (match = TOKEN_REGEX.exec(text)) {
    tokens.push([match[1], match[2]]);
  }

  TOKEN_REGEX.lastIndex = 0;

  return tokens;
}
