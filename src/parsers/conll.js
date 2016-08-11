/**
 * Talisman parsers/conll
 * =======================
 *
 * A parser for the CONLL corpus files.
 */

/**
 * Function taking a CONLL corpus' text and returning an array of sentences
 * being arrays of (word, brill_tag, wsj_tag).
 *
 * @param  {string} text - The text to parse.
 * @return {array}       - The tokens.
 */
export default function conll(text) {
  const sentences = [],
        lines = text.split('\n');

  let sentence = [];
  for (let i = 0, l = lines.length; i < l; i++) {
    const line = lines[i];

    if (!line) {
      if (sentence.length) {
        sentences.push(sentence);
        sentence = [];
      }
    }
    else {
      sentence.push(line.split(' '));
    }
  }

  if (sentence.length)
    sentences.push(sentence);

  return sentences;
}
