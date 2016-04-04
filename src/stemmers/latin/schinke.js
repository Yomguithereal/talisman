/**
 * Talisman stemmers/latin/schinke
 * ================================
 *
 * The Schinke stemming algorithm (latin).
 *
 * [Reference]:
 * http://snowball.tartarus.org/otherapps/schinke/intro.html
 */

/**
 * Rules.
 */
const QUE_SET = new Set([
  'atque',
  'quoque',
  'neque',
  'itaque',
  'absque',
  'apsque',
  'abusque',
  'adaeque',
  'adusque',
  'denique',
  'deque',
  'susque',
  'oblique',
  'peraeque',
  'plenisque',
  'quandoque',
  'quisque',
  'quaeque',
  'cuiusque',
  'cuique',
  'quemque',
  'quamque',
  'quaque',
  'quique',
  'quorumque',
  'quarumque',
  'quibusque',
  'quosque',
  'quasque',
  'quotusquisque',
  'quousque',
  'ubique',
  'undique',
  'usque',
  'uterque',
  'utique',
  'utroque',
  'utribique',
  'torque',
  'coque',
  'concoque',
  'contorque',
  'detorque',
  'decoque',
  'excoque',
  'extorque',
  'obtorque',
  'optorque',
  'retorque',
  'recoque',
  'attorque',
  'incoque',
  'intorque',
  'praetorque'
]);

const SIMPLE_SUFFIXES = [
  /ibus$/,
  /ius$/,
  /ae$/,
  /am$/,
  /as$/,
  /em$/,
  /es$/,
  /ia$/,
  /is$/,
  /nt$/,
  /os$/,
  /ud$/,
  /um$/,
  /us$/,
  /a$/,
  /e$/,
  /i$/,
  /o$/,
  /u$/
];

const VERB_SUFFIXES = [
  [/iuntur$/, '$1i'],
  [/erunt$/, '$1i'],
  [/untur$/, '$1i'],
  [/iunt$/, '$1i'],
  [/unt$/, '$1i'],
  [/beris$/, '$1bi'],
  [/bor$/, '$1bi'],
  [/bo$/, '$1bi'],
  [/ero$/, '$1eri'],
  [/mini$/],
  [/ntur$/],
  [/stis$/],
  [/mur$/],
  [/mus$/],
  [/ris$/],
  [/sti$/],
  [/tis$/],
  [/tur$/],
  [/ns$/],
  [/nt$/],
  [/ri$/],
  [/m$/],
  [/r$/],
  [/s$/],
  [/t$/],
];

/**
 * Helpers.
 */
function normalizeLetters(stem) {
  return stem
    .replace(/j/g, 'i')
    .replace(/v/g, 'u');
}

/**
 * Function stemming the given latin word using the Schinke algorithm and
 * returning a noun stem and a verb stem.
 *
 * @param  {string} word - The word to stem.
 * @return {objet}       - The resulting stems (noun & verb).
 */
export default function(word) {

  // Preparing the word
  const preparedWord = normalizeLetters(
    word.toLowerCase().replace(/[^a-z]/g, '')
  );

  // Dropping the -que suffix
  const stem = preparedWord.replace(/que$/, '');

  // Checking whether the word ends in -que & is a protected stem
  if (preparedWord !== stem && QUE_SET.has(preparedWord))
    return {
      noun: preparedWord,
      verb: preparedWord
    };

  let nounStem = stem,
      verbStem = stem;

  // Computing the noun stem
  for (let i = 0, l = SIMPLE_SUFFIXES.length; i < l; i++) {
    const newStem = nounStem.replace(SIMPLE_SUFFIXES[i], '');

    if (newStem !== stem) {
      nounStem = newStem;
      break;
    }
  }

  // Computing the verb stem
  for (let i = 0, l = VERB_SUFFIXES.length; i < l; i++) {
    const [match, replacement] = VERB_SUFFIXES[i];

    if (match.test(verbStem)) {
      const pattern = new RegExp((replacement ? '(.{2,})' : '') + match.source);

      verbStem = verbStem.replace(pattern, replacement || '');
      break;
    }
  }

  // Returning the stem only if longer than one character
  return {
    noun: nounStem.length > 1 ? nounStem : stem,
    verb: verbStem.length > 1 ? verbStem : stem
  };
}
