/**
 * Talisman phonetics/french/fonem
 * ================================
 *
 * Implementation of the French phonetic algorithm "FONEM" designed to match
 * family names from Saguenay.
 *
 * [Reference]:
 * http://www.persee.fr/doc/pop_0032-4663_1981_num_36_6_17248
 *
 * [Article]:
 * Bouchard Gérard, Brard Patrick, Lavoie Yolande. FONEM : Un code de
 * transcription phonétique pour la reconstitution automatique des familles
 * saguenayennes. In: Population, 36ᵉ année, n°6, 1981. pp. 1085-1103;
 */
import deburr from 'lodash/deburr';

/**
 * Constants.
 */
const VOWELS = 'AEIOUY',
      CONSONANTS = `^${VOWELS}`,
      V = `[${VOWELS}]`,
      C = `[${CONSONANTS}]`;

/**
 * Rules.
 */
const RULES = {

  // Vowels & vowel clusters
  'V-1': [/E?AU/g, 'O'],
  'V-2': [/(?:E?AU|O)LT$/, 'O'],
  'V-3': [/E?AUT$/, 'O'],
  'V-4': [/E?AUX$/, 'O'],
  'V-5': [/(?:E?AU|O)LX$/, 'O'],
  'V-6': [/E?AUL?D$/, 'O'],
  'V-7': [/([^G])AY$/, '$1E'],
  'V-8': [/EUX$/, 'EU'],
  'V-9': [`EY(?=$|${C})`, 'E'],
  'V-10': [`(${C})?Y(?!${V})`, '$1I'],
  'V-11': [`(${V})I(?=${V})`, '$1Y'],
  'V-12': [`(${V})ILL`, '$1Y'],
  'V-13': [/OU(?=I(?!LL)|[AEOU])/g, 'W'],
  'V-14': [`(${V})\\1`, '$1'],

  // Nasals
  'V-15': [`[AE]M(?=[${CONSONANTS}N](?!$))`, 'EN'],
  'V-16': [`OM(?=[${CONSONANTS}N])`, 'ON'],
  'V-17': [`AN(?=${C})`, 'EN'],
  'V-18': [`(?:AIM|AIN|EIN)(?=${C}|$)`, 'IN'],
  'V-19': [/(?:BORNE?|BOURNE?|BURNE)$/, 'BURN'],
  'V-20': [`(?:^IM|IM(?=${C}))(?=[${CONSONANTS}N])`, 'IN'],

  // Consonants & consonant clusters
  'C-1': [/BV/g, 'V'],
  'C-2': [`(${V})C(?=[EIY])`, '$1SS'],
  'C-3': [/([^CX])C(?=[EIY])/g, '$1S'],
  'C-4': [/^C(?=[EIY])/, 'S'],
  'C-5': [/^C(?=[AOU])/, 'K'],
  'C-6': [`(${V})C$`, '$1K'],
  'C-7': [`C(?=[${CONSONANTS}CH])`, 'K'],
  'C-8': [/CC(?=[AOU])/g, 'K'],
  'C-9': [/CC(?=[EIY])/g, 'X'],
  'C-10': [/G(?=[EIY])/g, 'J'],
  'C-11': [/GA(?=I?[MN])/g, 'G§'], // The paper is inconsistent so I cheated.
  'C-12': [/(?:GEO|GEAU)/g, 'JO'],
  'C-13': [`GNI(?=${V})`, 'GN'],
  'C-14': [/(^|[^CPS])H/g, '$1'],
  'C-15': [/JEA/g, 'JA'],
  'C-16': [`^MAC(?=${C})`, 'M§'], // The paper is inconsistent so I cheated.
  'C-17': [/^MC/, 'M§'],
  'C-18': [/PH/g, 'F'],
  'C-19': [/QU/g, 'K'],
  'C-20': [/^SC(?=[EIY])/, 'S'],
  'C-21': [/(.)SC(?=[EIY])/g, '$1SS'],
  'C-22': [/(.)SC(?=[AOU])/g, '$1SK'],
  'C-23': [/SH/g, 'CH'],
  'C-24': [/TIA$/, 'SSIA'],
  'C-25': [/([AIOUY])W/g, '$1'],
  'C-26': [/X[CSZ]/g, 'X'],
  'C-27': [`(?:Z(?=${V})|(${C})Z(?=${C}))`, '$1S'],
  'C-28': [`(?:([${CONSONANTS}CLS])\\1|(C)C(?!${V})|(.S)S(?!${V})|([^I]L)L)`, '$1$2$3$4'],
  'C-28-bis': [/ILE$/, 'ILLE'],
  'C-29': [`(?:(ILS)|([CS]H)|([MN]P)|(R[CFKLNSX])|(${C})${C})$`, '$1$2$3$4$5'],
  'C-30': [/^(?:SINT?|SAINT?|SEIN|SEIM|CINQ?)/, 'ST-'],
  'C-31': [/^SAINTE/, 'STE-'],
  'C-32': [/^ST(?!E)/, 'ST-'],
  'C-33': [/^STE/, 'STE-']
};

// Compiling rules
for (const k in RULES) {
  const rule = RULES[k];

  if (!(rule[0] instanceof RegExp))
    rule[0] = new RegExp(rule[0], 'g');
}

// Rules must be ordered
const ORDERED_RULES = [
  'V-14', 'C-28', 'C-28-bis', // START
  'C-12',
  'C-9',
  'C-10',
  'C-16',
  'C-17',
  'C-20',
  'C-2', 'C-3', 'C-7',
  'V-2', 'V-3', 'V-4', 'V-5', 'V-6',
  'V-1',
  'C-14',
  'C-11',
  'C-33', 'C-32', 'C-31', 'C-30', // SAINT
  'V-15', 'V-17', 'V-18',
  'V-7', 'V-8', 'V-9', 'V-10', 'V-11', 'V-12', 'V-13', 'V-16', 'V-19', 'V-20', // V
  'C-1', 'C-4', 'C-5', 'C-6', 'C-8', 'C-13', 'C-15', 'C-18', // C
  'C-19', 'C-21', 'C-22', 'C-23', 'C-24', 'C-25', 'C-26', 'C-27', // C
  'C-29', // END
  'V-14', 'C-28', 'C-28-bis' // ONCE AGAIN
].map(key => RULES[key]);

const FIXING_RULES = [
  [/G§/g, 'GA'],
  [/M§/g, 'MAC']
];

/**
 * Function taking a single name and computing its FONEM code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The FONEM code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function fonem(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/french/fonem: the given name is not a string.');

  let code = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/, '');

  // Applying rules in order
  for (let i = 0, l = ORDERED_RULES.length; i < l; i++) {
    const [pattern, replacement] = ORDERED_RULES[i];

    code = code.replace(pattern, replacement);
  }

  // Fixing rules
  for (let i = 0, l = FIXING_RULES.length; i < l; i++)
    code = code.replace(...FIXING_RULES[i]);

  return code;
}
