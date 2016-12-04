/* eslint-disable */
/**
 * Talisman phonetics/french/fonem
 * ================================
 *
 * Implementation of the French phonetic algorithm "FONEM" designed to match
 * family names from Saguenay.
 *
 * [Author]: Frédéric Brouard
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
  'V-3': [/E?AU$/, 'O'],
  'V-4': [/E?AUX$/, 'O'],
  'V-5': [/(?:E?AU|O)LX$/, 'O'],
  'V-6': [/E?AUL?D$/, 'O'],
  'V-7': [/([^G])AY$/, '$1E'],
  'V-8': [/EUX$/, 'EU'],
  'V-9': [`EY(?=$|${C})`, 'E'],
  'V-10': [`(${C})?Y(?!${V})`, '$1I'],
  'V-11': [`(${V})ILL`, '$1Y'],
  'V-12': [`OU(?=I(?!LL)|[AEOU])`, 'W'],
  'V-13': [`(${V})\\1`, '$1'],

  // Nasals
  'V-14': [`[AE]M(?=[${CONSONANTS}N](?!$))`, 'EN'],
  'V-15': [`OM(?=[${CONSONANTS}N])`, 'ON'],
  'V-16': [`AN(?=${C}))`, 'EN'],
  'V-17': [`(?:AIM|AIN|EIN)(?=${C})`, 'IN'],
  'V-19': [/(?:BORNE?|BOURNE?|BURNE)$/, 'BURN'],
  'V-20': [`(?:^IM|IM(?=${C}))(?=[${CONSONANTS}N])`, 'IN'],

  // Consonants & consonant clusters
  'C-1': [/VB/g, 'V'],
  'C-2': [`(${V})C(?=[EIY])`, '$1SS'],
  'C-3': [`([^CX]C(?=[EIY]))`, '$1S'],
  'C-4': [/^C(?=[EIY])/, 'S'],
  'C-5': [/^C(=[AOU])/, 'K'],
  'C-6': [`(${V})C$`, '$1K'],
  'C-7': [`C(?=[${CONSONANTS}CH])`, 'K'],
  'C-8': [/CC(?=[AOU])/g, 'K'],
  'C-9': [/CC(?=[EIY])/g, 'X'],
  'C-10': [/G(?=[EIY])/g, 'G'],
  'C-11': [/GA(?=I?[MN])/g, 'GA'],
  'C-12': [/(?:GEO|GEAU)/g, 'JO'],
  'C-13': [`GNI(?=${V})`, 'GN'],
  'C-14': [/H(?![CPS])/g, ''],
  'C-15': [/JEA/g, 'JA'],
  'C-16': [`^MAC(?=${C})`, 'MAC'],
  'C-17': [/^MC/, 'MAC'],
  'C-18': [/PH/g, 'F'],
  'C-19': [/QU/g, 'K'],
  'C-20': [/^SC(?=[EIY])/, 'S'],
  'C-21': [/(.)SC(?=[EIY])/g, '$1SS'],
  'C-22': [/(.)SC(?=[AOU])/g, '$1SK'],
  'C-23': [/SH/g, 'CH'],
  'C-24': [/TIA$/, 'SSIA'],
  'C-25': [`([AIOUY])W`, '$1'],
  'C-26': [/C(?=[CSZ])/g, 'X'],
  'C-27': [`(?:Z(?=${V})|(${C})Z${C})`, '$1S'],
  // Some rules cannot be reduced to regular expressions...
  'C-30': [/^(?:SIN|SAIN|SEIN|SINT|SEIM|CIN|CINQ|SAINT)/, 'ST-'],
  'C-31': [/^SAINTE/, 'STE-'],
  'C-32': [/^ST/, 'ST-'],
  'C-33': [/^STE/, 'STE-']
};

// Compiling rules
for (const k in RULES) {
  const rule = RULES[k];

  if (!(rule[0] instanceof RegExp))
    rule[0] = new RegExp(rule[0], 'g');
}

const ORDERED_RULES = [
  'V-14', 'C-28',
  'C-12',
  'C-10',
  'V-2', 'V-3', 'V-4', 'V-5', 'V-6',
  'V-1',
  'C-14',
  'C-11',
  'C-30', 'C-31',
  'V-15', 'V-17', 'V-18',
  'C-16',
  'C-17',
  'C-2', 'C-3', 'C-7',
  'C-29', // END
  'V-14', 'C-28' // ONCE AGAIN
];

/**
 * Function taking a single name and computing its FONEM code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The FONEM code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function phonetic(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/french/fonem: the given name is not a string.');

  let code = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/, '');
}
