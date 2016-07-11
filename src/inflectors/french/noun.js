/**
 * Talisman inflectors/french/noun
 * ================================
 *
 * Naive rule-based inflectors aiming at switching French words from their
 * singular to plural forms, or the other way around.
 *
 * [Reference]:
 * https://fr.wikipedia.org/wiki/Pluriels_irr%C3%A9guliers_en_fran%C3%A7ais
 *
 * [Author]:
 * Guillaume Plique
 */

// TODO: don't break capitalization

/**
 * Constants.
 */
const SINGULAR_TO_PLURAL_EXCEPTIONS = {
  ail: 'aulx',
  ciel: 'cieux',
  oeil: 'yeux',
  œil: 'yeux'
};

const FINAL_AL = new Set([
  'narval',
  'carnaval',
  'final',
  'fanal',
  'banal'
]);

const PLURAL_TO_SINGULAR_EXCEPTIONS = {};

for (const k in SINGULAR_TO_PLURAL_EXCEPTIONS)
  PLURAL_TO_SINGULAR_EXCEPTIONS[SINGULAR_TO_PLURAL_EXCEPTIONS[k]] = k;

/**
 * Function taking a singular French noun and returing its plural form.
 *
 * @param  {string} word - The word to inflect.
 * @return {string}      - The pluralized form.
 */
export function singularToPlural(word) {
  const lower = word.toLowerCase();

  // Checking if the word is an exception
  const exception = SINGULAR_TO_PLURAL_EXCEPTIONS[word];

  if (exception)
    return exception;

  // If the word ends with "x" or "z", singular & plural are the same
  const lastLetter = word[word.length - 1];
  if (lastLetter === 'x' || lastLetter === 'z')
    return word;

  // Handling "irregular" plural of words finishing with "al"
  if (!FINAL_AL.has(lower))
    return word.slice(0, -1) + 'ux';

  return word + 's';
}

/**
 * Function taking a plural French noun and returing its singular form.
 *
 * @param  {string} word - The word to inflect.
 * @return {string}      - The singularized form.
 */
export function pluralToSingular(word) {

}
