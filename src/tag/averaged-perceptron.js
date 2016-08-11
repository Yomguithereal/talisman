/**
 * Talisman tag/averaged-perceptron
 * =================================
 *
 * The Averaged Perceptron POS tagging method.
 *
 * [Author]: Matthew Honnibal
 * [Reference]: http://spacy.io/blog/part-of-speech-POS-tagger-in-python/
 */

// NOTE: only keep relevant state after training & have a flag

/**
 * Defaults.
 */
const DEFAULTS = {
  iterations: 5,
  ambiguityThreshold: 0.97,
  frequencyThreshold: 20
};

/**
 * Helpers.
 */

/**
 * Function taking training sentences and returning
 *
 * @param  {array}  sentences - Array of sentences being arrays of (word, tag).
 * @return {object}           - Found classes & tags.
 */
function analyzeSentences(sentences) {
  const classes = new Set(),
        counts = {},
        tags = {};

  // Iterating over sentences
  for (let i = 0, l = sentences.length; i < l; i++) {
    const sentence = sentences[i];

    // Iterating over words
    for (let j = 0, m = sentence.length; j < m; j++) {
      const [word, tag] = sentence[j];
      classes.add(tag);

      if (!(word in counts))
        counts[word] = {};
      if (!(tag in counts[word]))
        counts[word][tag] = 0;
      counts[word][tag]++;
    }
  }

  // Adding words to the tag dictionary
  for (const word in counts) {
    const tagFrequencies = counts[word];

    // Finding max frequency
    let max = -Infinity,
        maxTag = null,
        sum = 0;

    for (const tag in tagFrequencies) {
      const count = tagFrequencies[tag];

      if (count > max) {
        maxTag = tag;
        max = count;
      }

      sum += count;
    }

    // We don't add rare words to the dictionary, just unambiguous ones
    if (sum >= DEFAULTS.frequencyThreshold &&
        (max / sum) >= DEFAULTS.ambiguityThreshold)
      tags[word] = maxTag;
  }

  return {classes, tags};
}

/**
 * The AveragedPerceptronTagger class.
 *
 * @constructor
 */
export default class AveragedPerceptronTagger {
  constructor(options) {
    options = options || {};

    this.options = {
      iterations: options.iterations || DEFAULTS.iterations
    };

    // Properties
    this.tags = {};
    this.classes = new Set();
  }

  /**
   * Method used to train the tagger with the input sentences.
   *
   * @param  {array} sentences - Array of sentences being arrays of (word, tag).
   * @return {AveragedPerceptronTagger} - Returns itself for chaining.
   */
  train(sentences) {
    const {classes, tags} = analyzeSentences(sentences);

    this.classes = classes;
    this.tags = tags;
  }
}
