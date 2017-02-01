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
 *
 * [Notes]:
 * The article use the term "degree" in a somewhat incorrect way. It's more
 * of the propension of a given word to find itself in a long keyword.
 */
import Heap from 'mnemonist/heap';

// TODO: mitigation strategy to implement
// TODO: tokenizer option, stemmer option
// TODO: option for keyword merging
// TODO: configure T
// TODO: handle numbers

/**
 * Constants.
 */
const PUNCTUATION = /^[^\w\s]+$/,
      HASH_DELIMITER = '\u0001';

/**
 * Helpers.
 */
function comparator(a, b) {
  if (a.score < b.score)
    return -1;
  if (a.score > b.score)
    return 1;
  return 0;
}

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
   * to extract keywords.
   *
   * Alternatively, one can also stem the given tokens beforehand to minimize
   * the number of distinct keyword words.
   *
   * @param  {array}  doc - Target document.
   * @return {array}      - Resulting keywords.
   */
  return function(doc) {

    // First we need to find candidate keywords & score individual words
    const candidateKeywords = new Set(),
          wordFrequencies = {},
          wordDegrees = {};

    for (let i = 0, l = doc.length; i < l; i++) {
      const sentence = doc[i];

      let keyword = [];

      for (let j = 0, m = sentence.length; j < m; j++) {
        const word = sentence[j];

        if (stopwordsSet.has(word) || PUNCTUATION.test(word)) {
          if (keyword.length) {

            // Storing the hashed keyword for later
            candidateKeywords.add(keyword.join(HASH_DELIMITER));

            // Updating the degrees
            const degree = keyword.length - 1;

            for (let k = 0, n = keyword.length; k < n; k++) {
              wordDegrees[keyword[k]] = wordDegrees[keyword[k]] || 0;
              wordDegrees[keyword[k]] += degree;
            }

            keyword = [];
          }
        }
        else {

          // Updating word frequency
          wordFrequencies[word] = wordFrequencies[word] || 0;
          wordFrequencies[word]++;

          // Adding the word to the current keyword
          keyword.push(word);
        }
      }
    }

    // Now we need to score the keywords and retrieve the best one
    const heap = new Heap(comparator),
          T = (candidateKeywords.size / 3) | 0;

    candidateKeywords.forEach(keyword => {
      const words = keyword.split(HASH_DELIMITER);
      let score = 0;

      for (let i = 0, l = words.length; i < l; i++) {
        const word = words[i];
        score += wordDegrees[word] / wordFrequencies[word];
      }

      heap.push({score, keyword: words});

      if (heap.size > T)
        heap.pop();
    });

    // Returning the results
    const result = new Array(T);

    for (let i = heap.size - 1; i >= 0; i--)
      result[i] = heap.pop().keyword;

    return result;
  };
}
