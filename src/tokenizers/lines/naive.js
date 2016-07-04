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
const LINES = /\r?\n/;

/**
 * Function tokenizing raw text into a sequence of lines.
 *
 * @param  {string} text - The text to tokenize.
 * @return {array}       - The tokens.
 */
export default function lines(text) {
  const tokens = text.split(LINES);

  // Removing last break by convention
  if (!tokens[tokens.length])
    tokens.pop();

  return tokens;
}
