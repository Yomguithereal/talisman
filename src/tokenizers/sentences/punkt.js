/**
 * Talisman tokenizers/sentences/punkt
 * ====================================
 *
 * The Punkt unsupervised sentence tokenizer. Note that this is a port of the
 * nltk version of the trainer written in python. This means I did not try
 * too much to change the code architecture and sticked quite directly to
 * the original implementation's classes etc.
 *
 * TODO: the architecture can be changed a bit to fit JS more and allow for
 * easier customization.
 *
 * [Reference]:
 * http://www.nltk.org/_modules/nltk/tokenize/punkt.html
 *
 * [Article]:
 * Kiss, Tibor and Strunk, Jan (2006): Unsupervised Multilingual Sentence
 * Boundary Detection.  Computational Linguistics 32: 485-525.
 */

/**
 * Hash separator.
 */
const SEP = '‡';

/**
 * Orthographic context constants.
 *
 * BEG = beginning
 * MID = middle
 * UNK = unknown
 * UC = uppercase
 * LC = lowercase
 * NC = no case
 */
const ORTHO_BEG_UC = 1 << 1,
      ORTHO_MID_UC = 1 << 2,
      ORTHO_UNK_UC = 1 << 3,
      ORTHO_BEG_LC = 1 << 4,
      ORTHO_MID_LC = 1 << 5,
      ORTHO_UNK_LC = 1 << 6;

const ORTHO_UC = ORTHO_BEG_UC + ORTHO_MID_UC + ORTHO_UNK_UC,
      ORTHO_LC = ORTHO_BEG_LC + ORTHO_MID_LC + ORTHO_UNK_LC;

/**
 * Class representing language dependent variables.
 *
 * @constructor
 */
export class PunktLanguageVariables {
  constructor() {

    // Characters which are candidates for sentence boundaries
    this.sentenceEndCharacters = new Set('.?!');

    // Internal punctuation
    this.internalPunctuation = new Set(',:;');

    // Boundary realignement
    this.reBoundaryRealignment = /["')\]}]+?(?:\s+|(?=--)|$)/;

    // Excluding some characters from starting word tokens
    this.reWordStart = /[^\("\`{\[:;&\#\*@\)}\]\-,]/;

    // Characters that cannot appear within a word
    this.reNonWordCharacters = /(?:[?!)";}\]\*:@\'\({\[])/;

    // Hyphen & ellipsis are multi-character punctuation
    this.reMultiCharacterPunctuation = /(?:\-{2,}|\.{2,}|(?:\.\s){2,}\.)/;
  }

  /**
   * Method creating and returning a word tokenizer regular expression.
   *
   * TODO: does this have to be dynamic?
   *
   * @return {RegExp} - The regular expression.
   */
  getWordTokenizerRegExp() {
    const nonWord = this.reNonWordCharacters.source,
          multiChar = this.reMultiCharacterPunctuation.source,
          wordStart = this.reWordStart.source;

    const pattern = [
      '(',
        multiChar,
        '|',
        `(?=${wordStart})\\S+?`,
        '(?=',
          '\\s|',
          '$|',
          `${nonWord}|${multiChar}|`,
          `,(?=$|\\s|${nonWord}|${multiChar})`,
        ')',
        '|',
        '\\S',
      ')'
    ].join('');

    return new RegExp(pattern, 'g');
  }

  /**
   * Method used to tokenize the words in the given string.
   *
   * @param  {string} string - String to tokenize.
   * @return {array}         - An array of matches.
   */
  tokenizeWords(string) {
    return string.match(this.getWordTokenizerRegExp());
  }
}

/**
 * Class storing the data used to perform sentence boundary detection with the
 * Punkt algorithm.
 *
 * @constructor
 */
class PunktParameters {
  constructor() {

    // A set of word types for known abbreviations.
    this.abbreviationTypes = new Set();

    // A set of word type tuples for known common collocations where the first
    // word ends in a period ('S. Bach', for instance is a common collocation
    // in a text discussing 'Johann S. Bach').
    this.collocations = new Set();

    // A set of word types for words that often appear at the beginning of
    // sentences.
    this.sentenceStarters = new Set();

    // A dictionary mapping word types to the the set of orthographic contexts
    // that word type appears in.
    this.orthographicContext = {};
  }

  /**
   * Method used to add a context to the given word type.
   *
   * @param  {string}         type - The word type.
   * @param  {number}         flag - The context's flag.
   * @return {PunktParameter}      - Returns itself for chaining purposes.
   */
  addOrthographicContext(type, flag) {
    this.orthographicContext[type] |= flag;
    return this;
  }
}

/**
 * Regular expressions used by the tokens.
 */
const RE_ELLIPSIS = /\.\.+$/,
      RE_NUMERIC = /^-?[\.,]?\d[\d,\.-]*\.?$/,
      RE_INITIAL = /[^\W\d]\.$/,
      RE_ALPHA = /[^\W\d]+$/;

/**
 * Class representing a token of text with annotations produced during
 * sentence boundary detection.
 *
 * @constructor
 * @param {string} string - The token's string.
 * @param {params} object - Custom flags.
 */
export class PunktToken {
  constructor(string, params = {}) {

    // Properties
    this.string = string;
    this.periodFinal = string[string.length - 1] === '.';
    this.type = string.toLowerCase().replace(RE_NUMERIC, '##number##');

    for (const k in params)
      this[k] = params[k];
  }

  /**
   * Method used for string coercion.
   *
   * @return {string} - The token's string representation.
   */
  toString() {
    return this.string;
  }
}

/**
 * Customization variables.
 */
const ABBREV = 0.3,
      IGNORE_ABBREV_PENALTY = false,
      ABBREV_BACKOFF = 5,
      COLLOCATION = 7.88,
      SENTENCE_STARTER = 30,
      INCLUDE_ALL_COLLOCATIONS = false,
      INCLUDE_ABBREV_COLLOCATIONS = false,
      MIN_COLLOCATION_FREQUENCY = 1;

/**
 * Punkt abstract class used by both the Trainer & the Tokenizer classes.
 *
 * @constructor
 */
export class PunktBaseClass {
  constructor(options) {
    const {
      vars = new PunktLanguageVariables(),
      params = new PunktParameters()
    } = options || {};

    this.params = params;
    this.vars = vars;
  }

  /**
   * Method used to tokenize the given text into tokens, using the Punkt word
   * segmentation regular expression, and generate the resulting list of
   * tokens.
   *
   * @param  {string} text - The raw text to tokenize.
   * @return {array}       - The resulting tokens.
   */
  tokenize(text) {
    let paragraphStart = false;

    const lines = text.split(/\r?\n/g),
          tokens = [];

    for (let i = 0, l = lines.length; i < l; i++) {
      const line = lines[i].trim();

      if (line) {
        const words = this.vars.tokenizeWords(line);

        tokens.push(new PunktToken(words[0], {lineStart: true}))

        paragraphStart = false;

        for (let j = 1, m = words.length; j < m; j++)
          tokens.push(new PunktToken(words[j]));
      }
      else {
        paragraphStart = true;
      }
    }

    return tokens;
  }
}

/**
 * Class representing the Punkt trainer.
 *
 * @constructor
 */
export class PunktTrainer extends PunktBaseClass {
  constructor(options) {
    super(options);

    // A frequency distribution giving the frequenct of each case-normalized
    // token type in the training data.
    this.typeFdist = null;

    // Number of words ending in period in the training data.
    this.periodTokenCount = 0;

    // A frequency distribution givin the frequency of all bigrams in the
    // training data where the first word ends in a period.
    this.sentenceStarterFdist = null;

    // The total number of sentence breaks identified in training, used for
    // calculating the frequent sentence starter heuristic.
    this.sentenceBreakCount = 0;

    // A flag controlling whether the training has been finalized by finding
    // collocations and sentence starters, or whether training still needs to be
    // finalized
    this.finalized = true;
  }

  /**
   * Method used to train a model based on the given text.
   *
   * @param  {string} text - The training text.
   * @return {Trainer}     - Returns itself for chaining purposes.
   */
  train(text) {

    // First we need to tokenize the words
  }
}

/**
 * Class representing the Punkt sentence tokenizer.
 *
 * @constructor
 */
export class PunktSentenceTokenizer extends PunktBaseClass {}
