/**
 * Talisman tokenizers/sentences/punkt
 * ====================================
 *
 * The Punkt unsupervised sentence tokenizer.
 *
 * [Reference]:
 * http://www.nltk.org/_modules/nltk/tokenize/punkt.html
 *
 * [Article]:
 * Kiss, Tibor and Strunk, Jan (2006): Unsupervised Multilingual Sentence
 * Boundary Detection.  Computational Linguistics 32: 485-525.
 */

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
class LanguageVariables {
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
}

/**
 * The Punkt Trainer
 *
 * @constructor
 */
class Trainer {
  constructor() {

  }
}
