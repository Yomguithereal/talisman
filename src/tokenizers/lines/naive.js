/**
 * Talisman tokenizers/lines/naive
 * ================================
 *
 * A very simple line splitter.
 *
 * [Author]: Guillaume PLIQUE
 */

/**
 * Regex.
 */
const LINES = /(?:\r\n|\n\r|\n|\r)/;

/**
 * Function tokenizing raw text into a sequence of lines.
 *
 * @param  {string} text - The text to tokenize.
 * @return {array}       - The tokens.
 */
export default function lines(text) {
  return text.split(LINES);
}
