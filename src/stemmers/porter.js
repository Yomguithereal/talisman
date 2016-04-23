/* eslint no-cond-assign: 0 */
/**
 * Talisman stemmers/porter
 * =========================
 *
 * The classical Porter stemmer.
 *
 * [Reference]:
 * http://tartarus.org/martin/PorterStemmer/
 *
 * [Article]:
 * C.J. van Rijsbergen, S.E. Robertson and M.F. Porter, 1980. New models in
 * probabilistic information retrieval. London: British Library.
 * (British Library Research and Development Report, no. 5587).
 */

/**
 * Suffixes.
 */
const STEP2_SUFFIXES = [
  'ational',
  'tional',
  'enci',
  'anci',
  'izer',
  'bli',
  'alli',
  'entli',
  'eli',
  'ousli',
  'ization',
  'ation',
  'ator',
  'alism',
  'iveness',
  'fulness',
  'ousness',
  'aliti',
  'iviti',
  'biliti',
  'logi'
];

const STEP3_SUFFIXES = [
  'icate',
  'ative',
  'alize',
  'iciti',
  'ical',
  'ful',
  'ness'
];

const STEP4_SUFFIXES = [
  'al',
  'ance',
  'ence',
  'er',
  'ic',
  'able',
  'ible',
  'ant',
  'ement',
  'ment',
  'ent',
  'ou',
  'ism',
  'ate',
  'iti',
  'ous',
  'ive',
  'ize'
];

const STEP2_SUFFIXES_REGEX = new RegExp(`^(.+?)(${STEP2_SUFFIXES.join('|')})$`),
      STEP3_SUFFIXES_REGEX = new RegExp(`^(.+?)(${STEP3_SUFFIXES.join('|')})$`),
      STEP4_SUFFIXES_REGEX = new RegExp(`^(.+?)(${STEP4_SUFFIXES.join('|')})$`);

/**
 * Steps maps.
 */
const STEP2_MAP = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log'
};

const STEP3_MAP = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: ''
};

/**
 * Patterns.
 */
const C = '[^aeiou]',
      V = '[aeiouy]',
      CC = `${C}${C}*`,
      VV = `${V}${V}*`;

const MGR0 = new RegExp(`^(${CC})?${VV}${CC}`),
      MEQ1 = new RegExp(`^(${CC})?${VV}${CC}(${VV})?$`),
      MGR1 = new RegExp(`^(${CC})?${VV}${CC}${VV}${CC}`),
      VOWEL_IN_STEM = new RegExp(`^(${CC})?${V}`);

const STEP1a1 = /^(.+?)(ss|i)es$/,
      STEP1a2 = /^(.+?)([^s])s$/;

const STEP1b1 = /^(.+?)eed$/,
      STEP1b2 = /^(.+?)(ed|ing)$/,
      STEP1b3 = /(at|bl|iz)$/,
      STEP1b4 = /([^aeiouylsz])\1$/,
      STEP1b5 = new RegExp(`^${CC}${V}[^aeiouwxy]$`);

const STEP1c = new RegExp(`^(.*${V}.*)y$`);

const STEP4 = /^(.+?)(s|t)(ion)$/;

const STEP51 = /^(.+?)e$/,
      STEP52 = new RegExp(`^${CC}${V}[^aeiouwxy]$`);

/**
 * Helpers.
 */
function chop(string) {
  return string.slice(0, -1);
}

function match(regex, string) {
  const m = regex.exec(string);
  regex.lastIndex = 0;
  return m;
}


/**
 * Function stemming the given world using the Porter algorithm.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function porter(word) {
  word = word.toLowerCase();

  // If the word is too short, we return it unscathed
  if (word.length < 3)
    return word;

  let m = null;

  // If the first letter is a Y, we uppercase it so it's not treated as vowel
  if (word[0] === 'y')
    word = 'Y' + word.slice(1);

  //-- Step 1a
  word = word.replace(STEP1a1, '$1$2');
  word = word.replace(STEP1a2, '$1$2');

  //-- Step 1b
  if (m = match(STEP1b1, word)) {
    const [, stem] = m;

    if (MGR0.test(stem))
      word = chop(word);
  }
  else if (m = match(STEP1b2, word)) {
    const [, stem] = m;

    if (VOWEL_IN_STEM.test(stem)) {
      word = stem;

      if (STEP1b3.test(word))
        word = word + 'e';
      else if (STEP1b4.test(word))
        word = chop(word);
      else if (STEP1b5.test(word))
        word = word + 'e';
    }
  }

  //-- Step 1c
  if (m = match(STEP1c, word)) {
    const [, stem] = m;

    word = stem + 'i';
  }

  //-- Step 2
  if (m = match(STEP2_SUFFIXES_REGEX, word)) {
    const [, stem, suffix] = m;

    if (MGR0.test(stem))
      word = stem + STEP2_MAP[suffix];
  }

  //-- Step 3
  if (m = match(STEP3_SUFFIXES_REGEX, word)) {
    const [, stem, suffix] = m;

    if (MGR0.test(stem))
      word = stem + STEP3_MAP[suffix];
  }

  //-- Step 4
  if (m = match(STEP4_SUFFIXES_REGEX, word)) {
    const [, stem] = m;

    if (MGR1.test(stem))
      word = stem;
  }
  else if (m = match(STEP4, word)) {
    const [, first, second] = m,
          stem = first + second;

    if (MGR1.test(stem))
      word = stem;
  }

  //-- Step 5
  if (m = match(STEP51, word)) {
    const [, stem] = m;

    if (MGR1.test(stem) || (MEQ1.test(stem) && !STEP52.test(stem)))
      word = stem;
  }

  if (/ll$/.test(word) && MGR1.test(word))
    word = chop(word);

  return word.toLowerCase();
}
