/* eslint no-console: 0 */
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
 *
 * Note: this is necessary because of JavaScript's lack of tuples and the
 * derived possibility to use tuples as object keys. (ES6 Map won't resolve
 * the issue either since the key comparison is done through reference
 * comparison & not by hashing).
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

const ORTHO_MAP = {
  'initial§upper': ORTHO_BEG_UC,
  'internal§upper': ORTHO_MID_UC,
  'unknown§upper': ORTHO_UNK_UC,
  'initial§lower': ORTHO_BEG_LC,
  'internal§lower': ORTHO_MID_LC,
  'unknown§lower': ORTHO_UNK_LC
};

/**
 * Class representing a basic frequency distribution.
 *
 * @constructor
 */
class FrequencyDistribution {
  constructor() {
    this.counts = {};
    this.N = 0;
  }

  /**
   * Method used to add a single value to the distribution.
   *
   * @param  {string} value          - The value to add.
   * @return {FrequencyDistribution} - Itself for chaining purposes.
   */
  add(value) {
    this.counts[value] = this.counts[value] || 0;
    this.counts[value]++;
    this.N++;
  }

  /**
   * Method used to get the frequency for a single value.
   *
   * @param  {string} value - The targeted value.
   * @return {number}       - The frequency for the given value.
   */
  get(value) {
    return this.counts[value] || 0;
  }

  /**
   * Method used to get the unique values stored by the distribution.
   *
   * @return {array} - An array of the unique values.
   */
  values() {
    return Object.keys(this.counts);
  }
}

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
    this.orthographicContext[type] = this.orthographicContext[type] || 0;
    this.orthographicContext[type] |= flag;
    return this;
  }
}

/**
 * Regular expressions used by the tokens.
 */
const RE_ELLIPSIS = /^\.\.+$/,
      RE_NUMERIC = /^-?[\.,]?\d[\d,\.-]*\.?$/,
      RE_INITIAL = /^[^\W\d]\.$/,
      RE_ALPHA = /^[^\W\d]+$/,
      RE_NON_PUNCT = /[^\W\d]/;

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

    // TODO: this is fishy, since it collides with ellipsis. Maybe refine
    this.isEllipsis = RE_ELLIPSIS.test(string);
    this.isNumber = this.type === '##number##';
    this.isInitial = RE_INITIAL.test(string);
    this.isAlpha = RE_ALPHA.test(string);
    this.isNonPunctuation = RE_NON_PUNCT.test(string);
    this.isInitialAlpha = /^[^\W\d]/.test(string);

    for (const k in params)
      this[k] = params[k];
  }

  /**
   * Method used to retrieve the token's type with its final period removed if
   * it has one.
   *
   * @return {string}
   */
  typeNoPeriod() {
    if (this.type.length > 1 && this.type.slice(-1) === '.')
      return this.type.slice(0, -1);
    return this.type;
  }

  /**
   * Method used to retrieve the token's type with its final period removed if
   * it is marked as a sentence break.
   *
   * @return {string}
   */
  typeNoSentencePeriod() {
    if (this.sentenceBreak)
      return this.typeNoPeriod();
    return this.type;
  }

  /**
   * Method used to return whether the token's first character is uppercase.
   *
   * @return {boolean}
   */
  firstUpper() {
    return this.isInitialAlpha && this.string[0] === this.string[0].toUpperCase();
  }

  /**
   * Method used to return whether the token's first character is lowercase.
   *
   * @return {boolean}
   */
  firstLower() {
    return this.isInitialAlpha && this.string[0] === this.string[0].toLowerCase();
  }

  /**
   * Method used to return the token's first character's case.
   *
   * @return {string} - "lower" or "upper".
   */
  firstCase() {
    if (this.firstLower())
      return 'lower';
    if (this.firstUpper())
      return 'upper';
    return 'none';
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
      SENT_STARTER = 30,
      INCLUDE_ALL_COLLOCS = false,
      INCLUDE_ABBREV_COLLOCS = false,
      MIN_COLLOC_FREQ = 1;

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
    } = options || {};

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

        tokens.push(new PunktToken(words[0], {lineStart: true, paragraphStart}));

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

  /**
   * Method used to perform the first pass of token annotation, which makes
   * decisions based purely based of the word type of each word:
   *   - "?", "!", and "." are marked as sentence breaks.
   *   - sequences of two or more periods are marked as ellipsis.
   *   - any word ending in "." that is a known abbreviation is marked as such.
   *   - any othe word ending in "." is marked as a sentence break.
   *
   * @param  {array} tokens   - The tokens to annotate.
   * @return {PunktBaseClass} - Returns itself for chaining purposes.
   */
  _annotateFirstPass(tokens) {
    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i],
            string = token.string;

      if (this.vars.sentenceEndCharacters.has(string)) {
        token.sentenceBreak = true;
      }
      else if (token.isEllipsis) {
        token.ellipsis = true;
      }
      else if (token.periodFinal && !string.endsWith('..')) {
        const t = string.slice(0, -1).toLowerCase();

        if (this.params.abbreviationTypes.has(t) ||
            this.params.abbreviationTypes.has(t.split('-').slice(-1)[0])) {
          token.abbreviation = true;
        }
        else {
          token.sentenceBreak = true;
        }
      }
    }

    return this;
  }
}

/**
 * Miscellaneous helpers.
 */

/**
 * Computing the Dunning log-likelihood ratio scores for abbreviation
 * candidates.
 *
 * @param {number} a  - Count of <a>.
 * @param {number} b  - Count of <b>.
 * @param {number} ab - Count of <ab>.
 * @param {number} N  - Number of elements in the distribution.
 * @return {number}   - The log-likelihood.
 */
function dunningLogLikelihood(a, b, ab, N) {
  const p1 = b / N,
        p2 = 0.99;

  const nullHypothesis = ab * Math.log(p1) + (a - ab) * Math.log(1 - p1),
        alternativeHyphothesis = ab * Math.log(p2) + (a - ab) * Math.log(1 - p2);

  const likelihood = nullHypothesis - alternativeHyphothesis;

  return (-2 * likelihood);
}

/**
 * A function that wil just compute log-likelihood estimate, in the original
 * paper, it's described in algorithm 6 and 7.
 *
 * Note: this SHOULD be the original Dunning log-likelihood values.
 *
 * @param {number} a  - Count of <a>.
 * @param {number} b  - Count of <b>.
 * @param {number} ab - Count of <ab>.
 * @param {number} N  - Number of elements in the distribution.
 * @return {number}   - The log-likelihood.
 */
function colLogLikelihood(a, b, ab, N) {
  const p = b / N,
        p1 = ab / a,
        p2 = (b - ab) / (N - a);

  const summand1 = ab * Math.log(p) + (a - ab) * Math.log(1 - p),
        summand2 = (b - ab) * Math.log(p) + (N - a - b + ab) * Math.log(1 - p);

  let summand3 = 0;
  if (a !== ab)
    summand3 = ab * Math.log(p1) + (a - ab) * Math.log(1 - p1);

  let summand4 = 0;
  if (b !== ab)
    summand4 = (b - ab) * Math.log(p2) + (N - a - b + ab) * Math.log(1 - p2);

  const likelihood = summand1 + summand2 - summand3 - summand4;

  return (-2 * likelihood);
}

/**
 * Class representing the Punkt trainer.
 *
 * @constructor
 */
export class PunktTrainer extends PunktBaseClass {
  constructor(options) {
    const {
      verbose = false
    } = options || {};

    super(options);

    // Should the trainer log information?
    this.verbose = verbose;

    // A frequency distribution giving the frequenct of each case-normalized
    // token type in the training data.
    this.typeFdist = new FrequencyDistribution();

    // Number of words ending in period in the training data.
    this.periodTokenCount = 0;

    // A frequency distribution giving the frequency of all bigrams in the
    // training data where the first word ends in a period.
    this.collocationFdist = new FrequencyDistribution();

    // A frequency distribution givin the frequency of all bigrams in the
    // training data where the first word ends in a period.
    this.sentenceStarterFdist = new FrequencyDistribution();

    // The total number of sentence breaks identified in training, used for
    // calculating the frequent sentence starter heuristic.
    this.sentenceBreakCount = 0;

    // A flag controlling whether the training has been finalized by finding
    // collocations and sentence starters, or whether training still needs to be
    // finalized
    this.finalized = true;
  }

  /**---------------------------------------------------------------------------
   * Overhead reduction.
   **---------------------------------------------------------------------------
   */

  /**---------------------------------------------------------------------------
   * Orthographic data.
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to collect information about whether each token type occurs
   * with different case patterns (i) overall, (ii) at sentence-initial
   * positions, and (iii) at sentence-internal positions.
   *
   * @param  {array}   tokens - Training tokens.
   * @return {PunktTrainer}        - Returns itself for chaining purposes.
   */
  _getOrthographyData(tokens) {
    let context = 'internal';

    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i];

      // If we encounter a paragraph break, then it's a good sign that it's
      // a sentence break. But err on the side of caution (by not positing
      // a sentence break) if we just saw an abbreviation.
      if (token.paragraphStart && context !== 'unknown')
        context = 'initial';

      // If we are at the beginning of a line, then we can't decide between
      // "internal" and "initial"
      if (token.lineStart && context === 'internal')
        context = 'unknown';

      // Find the case-normalized type of the token. If it's a sentence-final
      // token, strip off the period.
      const type = token.typeNoSentencePeriod();

      // Update the orthographic context table.
      const flag = ORTHO_MAP[`${context}§${token.firstCase()}`] || 0;

      if (flag)
        this.params.addOrthographicContext(type, flag);

      // Decide whether the newt word is at a sentence boundary
      if (token.sentenceBreak) {
        if (!(token.isNumber || token.isInitial))
          context = 'initial';
        else
          context = 'unknown';
      }
      else if (token.ellipsis || token.abbreviation) {
        context = 'unknown';
      }
      else {
        context = 'internal';
      }
    }
  }

  /**---------------------------------------------------------------------------
   * Abbreviation.
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to reclassify the given token's type if:
   *   - it is period-final and not a know abbreviation
   *   - it is not period-final and is otherwise a known abbreviation by
   *     checking whether its previous classification still holds according to
   *     the heuristics of section 3.
   *
   * @param  {string} type - A token type.
   * @return {array|null}  - Returns a triple containing the following:
   *         {string}        [0]: the abbreviation.
   *         {number}        [1]: log-likelihood with penalties applied.
   *         {boolean}       [2]: whether the present type is a candidate for
   *                              inclusion or exclusion as an abbreviation.
   */
  _reclassifyAbbreviationType(type) {
    let isAdd;

    // Check some basic conditions, to rule out words that are clearly not
    // abbreviation types.
    if (type === '##number##"' || !RE_NON_PUNCT.test(type))
      return null;

    if (type.endsWith('.')) {
      if (this.params.abbreviationTypes.has(type))
        return null;
      type = type.slice(0, -1);
      isAdd = true;
    }
    else {
      if (!this.params.abbreviationTypes.has(type))
        return null;
      isAdd = false;
    }

    // Count how many periods & nonperiods are in the candidate type.
    const periodsCount = (type.match(/\./g) || []).length + 1,
          nonPeriodsCount = type.length - periodsCount + 1;

    // Let <a> be the candidate without the period, and <b> be the period.
    // Find a log likelihood ratio that indicates whether <ab> occurs as a
    // single unit (high value of ll), or as two independent units <a> and <b>
    // (low value of ll)
    const withPeriodCount = this.typeFdist.get(type + '.'),
          withoutPeriodCount = this.typeFdist.get(type);

    const ll = dunningLogLikelihood(
      withPeriodCount + withoutPeriodCount,
      this.periodTokenCount,
      withPeriodCount,
      this.typeFdist.N
    );

    // Apply three scaling factors to "tweak" the basic log-likelihood ratio:
    //   * fLength: long word => less likely to be an abbreviation
    //   * fPeriods: more periods => more likely to be an abbreviation
    //   * fPenalty: penalize occurences without a period
    const fLength = Math.exp(-nonPeriodsCount),
          fPeriods = periodsCount,
          fPenalty = !IGNORE_ABBREV_PENALTY ?
            Math.pow(nonPeriodsCount, -withoutPeriodCount) :
            IGNORE_ABBREV_PENALTY;

    const score = ll * fLength * fPeriods * fPenalty;

    return [type, score, isAdd];
  }

  /**
   * Method determining whether we stand before a rare abbreviation. A word
   * type is counted as a rare abbreviation if:
   *   - it's not already marked as an abbreviation
   *   - it occurs fewer than ABBREV_BACKOFF times
   *   - either it is followed by a sentence-internal punctuation mark, OR its
   *     is followed by a lower-case word that sometimes appears with upper-case
   *     but never occurs with lower case at the beginning of sentences.
   *
   * @param  {PunktToken} currentToken - The token.
   * @param  {PunktToken} nextToken    - The next token.
   * @return {boolean}
   */
  _isRareAbbreviationType(currentToken, nextToken) {
    if (currentToken.abbreviation || !currentToken.sentenceBreak)
      return false;

    // Find the case-normalized type of the token. If it's a sentence-final
    // token, strip off the period.
    const type = currentToken.typeNoSentencePeriod();

    // Proceed only if the type hasn't been categorized as an abbreviation
    // already, and is sufficiently rare.
    const count = this.typeFdist.get(type) + this.typeFdist.get(type.slice(0, -1));

    if (this.params.abbreviationTypes.has(type) || count >= ABBREV_BACKOFF)
      return false;

    // Record this type as an abbreviation if the next token is a
    // sentence-internal punctuation mark.
    if (this.vars.internalPunctuation.has(nextToken.string[0]))
      return true;

    // Record this type as an abbreviation if the next token:
    //   (i) starts with a lower case letter,
    //   (ii) sometimes occurs with an uppercase letter,
    //   (iii) nevers occurs with an uppercase letter sentence-internally
    else if (nextToken.firstLower()) {
      const nextType = nextToken.typeNoSentencePeriod(),
            context = this.params.orthographicContext[nextType];

      if ((context & ORTHO_BEG_UC) && !(context & ORTHO_MID_UC))
        return true;
    }

    return false;
  }

  /**---------------------------------------------------------------------------
   * Collocation finder.
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to determine whether the pair of tokens may form
   * a collocation given log-likelihood statistics.
   *
   * @param  {PunktToken} firstToken  - first The token.
   * @param  {PunktToken} secondToken - The second token.
   * @return {boolean}
   */
  _isPotentialCollocation(firstToken, secondToken) {
    return (
      (INCLUDE_ALL_COLLOCS ||
       (INCLUDE_ABBREV_COLLOCS && firstToken.abbreviation) ||
       (firstToken.sentenceBreak && (firstToken.isNumber || firstToken.isInitial))) &&
      firstToken.isNonPunctuation &&
      secondToken.isNonPunctuation
    );
  }


  /**
   * Method used to generate likely collocations and their log-likelihood.
   *
   * @return {array} - An array of results.
   */
  _findCollocations() {
    const types = this.collocationFdist.values(),
          results = [];

    for (let i = 0, l = types.length; i < l; i++) {
      const hash = types[i];

      // NOTE: beware memory reduction here!
      // TODO: check that it works properly
      const [type1, type2] = hash.split(SEP);

      if (this.params.sentenceStarters.has(type2))
        continue;

      const colCount = this.collocationFdist.get(hash),
            type1Count = this.typeFdist.get(type1) + this.typeFdist.get(type1 + '.'),
            type2Count = this.typeFdist.get(type2) + this.typeFdist.get(type2 + '.');

      if (type1Count > 1 &&
          type2Count > 1 &&
          MIN_COLLOC_FREQ < colCount &&
          colCount <= Math.min(type1Count, type2Count)) {

        const ll = colLogLikelihood(
          type1Count,
          type2Count,
          colCount,
          this.typeFdist.N
        );

        if (ll >= COLLOCATION &&
            (this.typeFdist.N / type1Count > type2Count / colCount))
          results.push([hash, ll]);
      }
    }

    return results;
  }

  /**---------------------------------------------------------------------------
   * Sentence starter finder.
   **---------------------------------------------------------------------------
   */

  /**
   * Method returning whether, given a token and the token that precedes it if
   * it seems clear that the token is beginning a sentence.
   *
   * @param  {PunktToken} token         - The token.
   * @param  {PunktToken} previousToken - The previous token.
   * @return {boolean}
   */
  _isPotentialSentenceStarter(token, previousToken) {

    // If a token (i) is preceded by a sentence break that is not a potential
    // ordinal number or initial, and (ii) is alphabetic, then it is a
    // sentence starter.
    return (
      previousToken.sentenceBreak &&
      !(previousToken.isNumber || previousToken.isInitial) &&
      token.isAlpha
    );
  }

  /**
   * Method using collocation heuristics for each candidate token to determine
   * if it frequently starts sentences.
   *
   * @return {array} - An array of results.
   */
  _findSentenceStarters() {
    const types = this.sentenceStarterFdist.values(),
          results = [];

    for (let i = 0, l = types.length; i < l; i++) {
      const type = types[i];

      if (!type)
        continue;

      const typeAtBreakCount = this.sentenceStarterFdist.get(type),
            typeCount = this.typeFdist.get(type);

      // This is needed after memory reduction methods
      if (typeCount < typeAtBreakCount)
        continue;

      const ll = colLogLikelihood(
        this.sentenceBreakCount,
        typeCount,
        typeAtBreakCount,
        this.typeFdist.N
      );

      if (ll >= SENT_STARTER &&
          this.typeFdist.N / this.sentenceBreakCount > typeCount / typeAtBreakCount) {
        results.push([type, ll]);
      }
    }

    return results;
  }

  /**---------------------------------------------------------------------------
   * Training methods.
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to train a model based on the given text.
   *
   * @param  {string}  text     - The training text.
   * @param  {boolean} finalize - Whether to finalize the training or not.
   * @return {PunktTrainer}     - Returns itself for chaining purposes.
   */
  train(text, finalize = true) {

    // First we need to tokenize the words
    const tokens = this.tokenize(text);

    this.finalized = false;

    // Find the frequency of each case-normalized type.
    // Also record the number of tokens ending in periods.
    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i],
            type = token.type;

      this.typeFdist.add(type);

      if (token.periodFinal)
        this.periodTokenCount++;
    }

    // Look for new abbreviations, and for types that no longer are
    const uniqueTypes = this.typeFdist.values();

    for (let i = 0, l = uniqueTypes.length; i < l; i++) {
      const result = this._reclassifyAbbreviationType(uniqueTypes[i]);

      if (!result)
        continue;

      const [
        abbreviation,
        score,
        isAdd
      ] = result;

      if (score >= ABBREV) {
        if (isAdd) {
          this.params.abbreviationTypes.add(abbreviation);

          if (this.verbose)
            console.log(`Added abbreviation: [${score}] ${abbreviation}`);
        }
      }
      else {
        if (!isAdd) {
          this.params.abbreviationTypes.delete(abbreviation);

          if (this.verbose)
            console.log(`Remove abbreviation [${score}] ${abbreviation}`);
        }
      }
    }

    // Make a preliminary pass through the document, marking likely sentence
    // breaks, abbreviations, and ellipsis tokens.
    this._annotateFirstPass(tokens);

    // Check what context each word type can appear in, given the case of its
    // first letter.
    this._getOrthographyData(tokens);

    // We need total number of sentence breaks to find sentence starters
    for (let i = 0, l = tokens.length; i < l; i++) {
      if (tokens[i].sentenceBreak)
        this.sentenceBreakCount++;
    }

    // The remaining heuristics relate to pairs of tokens where the first ends
    // in a period.
    for (let i = 0, l = tokens.length; i < l; i++) {
      const currentToken = tokens[i],
            nextToken = tokens[i + 1];

      if (!currentToken.periodFinal || !nextToken)
        continue;

      // If the first token a rare abbreviation?
      if (this._isRareAbbreviationType(currentToken, nextToken)) {
        this.params.abbreviationTypes.add(currentToken.typeNoPeriod());

        if (this.verbose)
          console.log('Rare abbreviation: ' + currentToken.type);
      }

      // Does the second token have a high likelihood of starting a sentence?
      if (this._isPotentialSentenceStarter(nextToken, currentToken))
        this.sentenceStarterFdist.add(nextToken.type);

      // Is this bigram a potential collocation?
      if (this._isPotentialCollocation(currentToken, nextToken)) {
        const hashedBigram = [
          currentToken.typeNoPeriod(),
          nextToken.typeNoSentencePeriod()
        ].join(SEP);

        this.collocationFdist.add(hashedBigram);
      }
    }

    // Should we finalize?
    if (finalize)
      this.finalize();

    return this;
  }

  /**
   * Method using the data that has been gathered in training to determine
   * likely collocations and sentence starters.
   *
   * @return {PunktTrainer} - Returns itself for chaining purposes.
   */
  finalize() {
    this.params.sentenceStarters.clear();
    const sentenceStarters = this._findSentenceStarters();

    for (let i = 0, l = sentenceStarters.length; i < l; i++) {
      const [type, ll] = sentenceStarters[i];
      this.params.sentenceStarters.add(type);

      if (this.verbose)
        console.log(`Sentence starter: [${ll}] ${type}`);
    }

    this.params.collocations.clear();
    const collocations = this._findCollocations();

    for (let i = 0, l = collocations.length; i < l; i++) {
      const [hash, ll] = collocations[i];

      this.params.collocations.add(hash);

      if (this.verbose)
        console.log(`Collocation: [${ll}] (${hash.split(SEP).join(', ')})`);
    }

    this.finalized = true;
    return this;
  }
}

/**
 * Class representing the Punkt sentence tokenizer.
 *
 * @constructor
 */
export class PunktSentenceTokenizer extends PunktBaseClass {}
