/**
 * Talisman keyword-extraction/rake
 * =================================
 *
 * JavaScript implementation of the "Rapid Automatic Keyword Extraction" (RAKE).
 *
 * [Article]:
 * Rose, S., Engel, D., Cramer, N., & Cowley, W. (2010). Automatic Keyword
 * Extraction from Individual Documents. In M. W. Berry & J. Kogan (Eds.),
 * Text Mining: Theory and Applications: John Wiley & Sons.
 */

// TODO: doesn't need to tokenize sentence I guess...
// TODO: need to hash the phrases

/**
 * Constants.
 */
const PUNCTUATION = /^[^\w\s]+$/;

/**
 * Factory function taking some options & returning a custom RAKE function.
 *
 * @param  {object} options     - Options:
 * @param  {array}    stopwords - List of stopwords to use.
 */
export default function createExtractor(options) {
  options = options || {};

  const stopwords = options.stopwords;

  if (!Array.isArray(stopwords))
    throw new Error('talisman/keyword-extraction/rake: expecting a list of stopwords.');

  const stopwordsSet = new Set(stopwords);

  /**
   * RAKE function taking an array of sentences being tokenized as words.
   * Note that the tokenization must keep punctuation in order to be able
   * to extract phrases.
   *
   * Alternatively, one can also stem the given tokens beforehand to minimize
   * the number of distinct keyword words.
   *
   * @param  {array}  doc - Target document.
   * @return {array}      - Resulting keywords.
   */
  return function(doc) {

    //-- 1) We need to find candidate phrases by splitting tokens by stopwords
    const candidatePhrases = [];

    for (let i = 0, l = doc.length; i < l; i++) {
      const sentence = doc[i];

      let phrase = [];

      for (let j = 0, m = sentence.length; j < m; j++) {
        const word = sentence[j];

        if (stopwordsSet.has(word) || PUNCTUATION.test(word)) {
          if (phrase.length) {
            candidatePhrases.push(phrase);
            phrase = [];
          }
        }
        else {
          phrase.push(word);
        }
      }
    }

    // console.log(candidatePhrases);
    return candidatePhrases;
  };
}
