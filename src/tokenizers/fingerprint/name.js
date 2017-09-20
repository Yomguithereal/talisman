/**
 * Talisman tokenizers/fingerprint/name
 * =====================================
 *
 * Variant of the fingerprint tokenizer but with opinionated options and
 * transformations known to work better with occidental names.
 */
import {createTokenizer} from './';
import {squeeze} from '../../helpers';

// TODO: handle roman numerals
// TODO: O'
// TODO: sort stopwords by length then alphabet

const RULES = [

  // McCallister / MacCallister
  [/\bmc(?=\w)/g, 'mac'],
  [/\b(ma?c\s+)(?=\w)/g, 'mac'],

  // Lee / Li
  [/\blee\b/g, 'li'],

  // Moussorgski / Moussorgsky
  [/ski\b/g, 'sky'],

  // Van Hoff / Von Hoff
  [/\bvan\b/g, 'von'],

  // Doerk / Dörk
  [/ö/g, 'oe'],

  // Düring / Duering
  [/ü/g, 'ue']
];

const OPTIONS = {
  digits: false,
  split: ['-'],
  stopwords: [

    // Articles etc.
    'the',
    'le',
    'la',
    'da',
    'di',
    'of',

    // Title
    'doctor',
    'dr',
    'esq',
    'mgr',
    'professor',
    'prof',
    'md',
    'phd',
    'sir',
    'lord',

    // Civility
    'mr',
    'mrs',
    'ms',
    'mme',
    'mlle',
    'jr',
    'junior',
    'sr',
    'senior'
  ]
};

const tokenizer = createTokenizer(OPTIONS);

/**
 * Function returning the fingerprint of the given name.
 *
 * @param  {string} name - Target name.
 * @param  {array}
 */
export default function nameFingerprint(name) {
  name = name.toLowerCase();

  // Applying rules
  for (let i = 0, l = RULES.length; i < l; i++)
    name = name.replace(RULES[i][0], RULES[i][1]);

  return tokenizer(name).map(squeeze);
}
