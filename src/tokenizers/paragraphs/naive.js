/**
 * Talisman tokenizers/paragraphs/naive
 * =====================================
 *
 * A very simple paragraph tokenizer.
 *
 * [Author]: Guillaume PLIQUE
 */

/**
 * Regex.
 */
const PARAGRAPHS = /[\n\r][\t\s]*[\n\r]+/g;

/**
 * Function tokenizing raw text into a sequence of paragraphs.
 *
 * @param  {string} text - The text to tokenize.
 * @return {array}       - The tokens.
 */
export default function paragraphs(text) {
  return text.split(PARAGRAPHS);
}
