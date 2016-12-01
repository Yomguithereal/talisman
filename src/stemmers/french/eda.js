/**
 * Talisman stemmers/french/eda
 * =============================
 *
 * The EDA stemmer for the French language. Note that this stemmers orignally
 * targets words from the medical world.
 *
 * [Reference]:
 * TODO ADD
 *
 * [Author]:
 * Didier Nakache
 *
 * [Article]:
 * Extraction automatique des diagnostics à partir des comptes rendus médicaux
 * textuels. Didier Nakache, 2007.
 */
import deburr from 'lodash/deburr';
import {squeeze} from '../../helpers';

/**
 * Constants.
 */
const PHONETIC_RULES = [
  [/(?:cqu|qu|ck?)/g, 'k'],
  [/y/g, 'i']
];

const SUFFIXES = [
  's',
  'e',
  'x',
  'ant',
  'al',
  'au',
  'tion',
  'sion',
  'er',
  'iv',
  'if',
  'abl',
  'ibl',
  'ment',
  'tele',
  'tel',
  'tos',
  'ik',
  'ton',
  'tos',
  'ent',
  'en',
  'tik',
  'toid',
  'o',
  'i',
  's',
  'dien',
  'u',
  'e',
  'era',
  'ank',
  'enk',
  'teur',
  'trice',
  'i'
];

/**
 * Function stemming the given world using the EDA algorithm for the French
 * language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function eda(word) {
  let stem = squeeze(deburr(word.toLowerCase()));

  // Early termination
  if (stem.length <= 5) {
    if (stem.slice(-1) === 'e')
      stem = stem.slice(0, -1);
    if (stem.slice(-1) === 's')
      stem = stem.slice(0, -1);

    return stem;
  }

  // Applying phonetic rules
  for (let i = 0, l = PHONETIC_RULES.length; i < l; i++) {
    const [pattern, replacement] = PHONETIC_RULES[i];

    stem = stem.replace(pattern, replacement);
  }

  // Removing suffixes
  for (let i = 0, l = SUFFIXES.length; i < l; i++) {
    const suffix = SUFFIXES[i];

    if (stem.slice(-suffix.length) === suffix) {
      stem = stem.slice(0, -suffix.length);

      if (stem.length <= 5) {
        if (stem.slice(-1) === 'e')
          stem = stem.slice(0, -1);
        if (stem.slice(-1) === 's')
          stem = stem.slice(0, -1);

        return stem;
      }
    }
  }

  return stem;
}
