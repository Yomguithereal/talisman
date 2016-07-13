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
 * [Author]:
 * Christopher Hench (UC Berkeley)
 */
import {updateFrequencies, relative} from '../../stats/frequencies';

/**
 * Constants.
 */
const VOWELS_STRING = 'aeiouyàáâäæãåāèéêëēėęîïíīįìôöòóœøōõûüùúūůÿ',
      VOWELS_RE = new RegExp(`[${VOWELS_STRING}]`, 'g'),
      VOWELS = new Set(VOWELS_STRING),
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
 * @param {object} options - Possible options.
 */
export class LegalipyTokenizer {
  constructor() {

    // Properties
    this.frequencies = {};
    this.onsets = new Set();
    this.finalized = false;
  }

  /**
   * Method used to train the onsets.
   *
   * @param  {array}             tokens - Word tokens.
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

    // Keeping onsets whose frequency is superior to threshold
    for (const k in this.frequencies) {
      if (this.frequencies[k] > THRESHOLD)
        this.onsets.add(k);
    }

    // Adding shorter subsets of onsets longer than 2 characters
    this.onsets.forEach(onset => {
      if (onset.length > 2)
        this.onsets.add(onset.slice(-2));
      if (onset.length > 3)
        this.onsets.add(onset.slice(-3));
    });

    // Releasing frequencies from memory
    this.frequencies = null;

    return this;
  }

  /**
   * Method used to tokenize words into syllables once trained.
   *
   * @param  {string} word - Target word.
   * @return {array}       - An array of syllables.
   *
   * @throws {Error} - Will throw if the tokenizer hasn't finalized its training.
   */
  tokenize(word) {
    if (!this.finalized)
      throw new Error('talisman/tokenizers/syllables/legalipy.train: you should finalize the tokenizer\'s training before being able to tokenize.');

    const vowelCount = (word.match(VOWELS_RE) || []).length;

    const syllables = [];

    if (vowelCount <= 1) {
      syllables.push(word);
    }

    else {
      let currentSyllable = '',
          onsetBinary = false,
          newSyllableBinary = true;

      // Iterating on the letters in reverse
      for (let i = word.length - 1; i >= 0; i--) {
        const originalLetter = word[i],
              letter = originalLetter.toLowerCase();

        const syllable = currentSyllable.toLowerCase();

        if (newSyllableBinary) {

          currentSyllable = originalLetter + syllable;

          if (VOWELS.has(letter)) {
            newSyllableBinary = false;
            continue;
          }
        }
        else if (!newSyllableBinary) {

          if (!syllable) {
            currentSyllable = originalLetter + syllable;
          }

          else if (
            (this.onsets.has(letter) && VOWELS.has(syllable[0])) ||
            (this.onsets.has(letter + syllable[0]) && VOWELS.has(syllable[1])) ||
            (this.onsets.has(letter + syllable.slice(0, 2)) && VOWELS.has(syllable[2])) ||
            (this.onsets.has(letter + syllable.slice(0, 3)) && VOWELS.has(syllable[3]))
          ) {
            currentSyllable = originalLetter + syllable;
            onsetBinary = true;
          }

          else if (VOWELS.has(letter) && !onsetBinary) {
            currentSyllable = originalLetter + syllable;
          }

          else if (VOWELS.has(letter) && onsetBinary) {
            syllables.unshift(syllable);
            currentSyllable = originalLetter;
          }

          else {
            syllables.unshift(syllable);
            currentSyllable = originalLetter;
            newSyllableBinary = true;
          }
        }
      }

      syllables.unshift(currentSyllable);
    }

    return syllables;
  }

  /**
   * Method used to export the tokenizer's onsets.
   *
   * @return {object} - An object containing the necessary metadata.
   */
  export() {
    return {
      onsets: Array.from(this.onsets)
    };
  }

  /**
   * Method used to force JSON.stringify to format the tokenizer using the
   * #.export method.
   */
  toJSON() {
    return this.export();
  }

  /**
   * Method used to import an existing model instead of having to train the
   * tokenizer.
   *
   * @param  {object}            model - The model to import.
   * @return {LegalipyTokenizer}       - Returns itself for chaining.
   */
  import(model) {
    this.finalize();
    this.onsets = new Set(model.onsets);
  }
}

/**
 * Function that can be used to tokenize a series of word tokens on the fly.
 *
 * @param  {array} tokens - Word tokens.
 * @return {array}        - A list of word tokenized as syllables.
 */
export default function defaultTokenizer(tokens) {
  const tokenizer = new LegalipyTokenizer();
  tokenizer.train(tokens);
  tokenizer.finalize();

  const newTokens = new Array(tokens.length);

  for (let i = 0, l = tokens.length; i < l; i++)
    newTokens[i] = tokenizer.tokenize(tokens[i]);

  return newTokens;
}
