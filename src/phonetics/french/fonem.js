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

/**
 * Rules.
 */
const RULES = {
  'V-1': [/E?AU/g, 'O'],
  'V-2': [/(?:E?AU|O)LT$/, 'O'],
  'V-3': [/E?AU$/, 'O'],
  'V-4': [/E?AUX$/, 'O'],
  'V-5': [/(?:E?AU|O)LX$/, 'O'],
  'V-6': [/E?AUL?D$/, 'O']
};
