/**
 * Talisman tokenizers/syllables/legalipy
 * =======================================
 *
 * Language-independent syllabification from raw text based on the Onset
 * Maximization Principle (principle of legality).
 *
 * [Reference]:
 * https://github.com/henchc/LegaliPy
 * http://syllabipy.com/index.php/legalipy-demo/
 *
 * [Authors]:
 * Christopher Hench (UC Berkeley)
 */
import {updateFrequencies, relative} from '../../stats/frequencies';

/**
 * Constants.
 */
const VOWELS = new Set('aeiouyàáâäæãåāèéêëēėęîïíīįìôöòóœøōõûüùúūůÿ'),
      PUNCTUATION_RE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g,
      THRESHOLD = 0.0002;

/**
 * Helpers.
 */

/**
 * Function used to clean the word and prepare it for the trainer.
 *
 * @param  {string} word - The target word.
 * @return {string}      - The cleaned word.
 */
function clean(word) {
  return word
    .toLowerCase()
    .replace(PUNCTUATION_RE, '')
    .replace(/\d/g, '');
}

/**
 * Class representing the Legalipy tokenizer. Must be trained before use by
 * providing text tokens in which we will search for relevant onsets.
 *
 * @constructor
 */
export default class LegalipyTokenizer {
  constructor() {

    // Properties
    this.frequencies = {};
    this.onsets = new Set();
    this.finalized = false;
  }

  /**
   * Method used to train the onsets.
   *
   * @param  {array}           tokens - Text tokens.
   * @return {LegalipyTokenizer}        - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if the tokenizer has finalized its training.
   */
  train(tokens) {

    if (this.finalized)
      throw new Error('talisman/tokenizers/syllables/legalipy.train: the tokenizer has already finalized its training.');

    const onsets = [];

    // Iterating through the tokens
    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = clean(tokens[i]);

      if (token) {
        let onset = '';

        for (let j = 0, m = token.length; j < m; j++) {
          const letter = token[j];

          if (!VOWELS.has(letter))
            onset += letter;
          else
            break;
        }

        if (onset)
          onsets.push(onset);
      }
    }

    // Updating frequencies
    this.frequencies = updateFrequencies(this.frequencies, onsets);

    return this;
  }

  /**
   * Method used to finalize the training.
   *
   * @return {LegalipyTokenizer} - Returns itself for chaining.
   */
  finalize() {
    this.finalized = true;

    // Computing relative frequencies of the onsets
    this.frequencies = relative(this.frequencies);

    // Clearing recorded onsets from memory
    this.occurrences = null;

    // Keeping onsets whose frequency is superior to threshold
    for (const k in this.frequencies) {
      if (this.frequencies[k] > THRESHOLD)
        this.onsets.add(k);
    }

    return this;
  }
}
