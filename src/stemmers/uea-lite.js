/**
 * Talisman stemmers/uea-lite
 * ===========================
 *
 * The University of East Anglia (UEA) Lite stemmer.
 *
 * [Reference]:
 * http://www2.cmp.uea.ac.uk/~djs/projects/UEAlite/stemmer.html
 * http://github.com/ealdent/uea-stemmer
 *
 * [Authors]:
 * Marie-CLaire Jenkins
 * Dan Smith
 * Jason M. Adams (Ruby version additions)
 *
 * Note: there is still an issue with "charring" to fix.
 */

/**
 * Rules.
 */
const PROBLEMS = new Set([
  'is',
  'as',
  'this',
  'has',
  'was',
  'during',
  'menses'
]);

const CONTRACTIONS = [
  [/n't/, ' not'],
  [/'ve/, ' have'],
  [/'re/, ' are'],
  [/'m/, ' am']
];

const RULES = [
  [/^\d+$/, null, '90.3'],
  [/^\w+-\w+$/, null, '90.2'],
  [/-/, null, '90.1'],
  [/_/, null, '90'],
  [/^[A-Z]+s$/, 1, '91.1'],
  [/^[A-Z]+$/, null, '91'],
  [/^(?:.*[A-Z].*[A-Z]|[A-Z]{1}).*$/, null, '92'],
  [/aceous$/, 6, '1'],
  [/ces$/, 1, '2'],
  [/cs$/, null, '3'],
  [/sis$/, null, '4'],
  [/tis$/, null, '5'],
  [/ss$/, null, '6'],
  [/eed$/, null, '7'],
  [/eeds$/, 1, '7'],
  [/ued$/, 1, '8'],
  [/ues$/, 1, '9'],
  [/ees$/, 1, '10'],
  [/iases$/, 2, '11.4'],
  [/uses$/, 1, '11.3'],
  [/sses$/, 2, 11.2],
  [/eses$/, 'esis', '11.1'],
  [/ses$/, 1, '11'],
  [/tled$/, 1, '12.5'],
  [/pled$/, 1, '12.4'],
  [/bled$/, 1, '12.3'],
  [/eled$/, 2, '12.2'],
  [/lled$/, 2, '12.1'],
  [/led$/, 2, '12'],
  [/ened$/, 2, '13.7'],
  [/ained$/, 2, '13.6'],
  [/erned$/, 2, '13.5'],
  [/rned$/, 2, '13.4'],
  [/nned$/, 3, '13.3'],
  [/oned$/, 2, '13.2'],
  [/gned$/, 2, '13.1'],
  [/ned$/, 1, '13'],
  [/ifted$/, 2, '14'],
  [/ected$/, 2, '15'],
  [/vided$/, 1, '16'],
  [/ved$/, 1, '17'],
  [/ced$/, 1, '18'],

  //--< Jason M. Adams
  [/arred$/, 3, '19.1'],
  //--> Jason M. Adams

  [/erred$/, 3, '19'],
  [/urred$/, 3, '20.5'],
  [/lored$/, 2, '20.4'],
  [/eared$/, 2, '20.3'],
  [/tored$/, 1, '20.2'],
  [/ered$/, 2, '20.1'],
  [/red$/, 1, '20'],
  [/reds$/, 2, '20'],
  [/tted$/, 3, '21'],

  //--< Jason M. Adams
  [/noted$/, 1, '22.6'],
  [/leted$/, 1, '22.5'],
  [/[^vm]ited$/, 2, '22.4'],
  [/(?:ch|[vm])i[td]ed$/, 1, '22.3'],
  [/uted$/, 1, '22.2'],
  [/ated$/, 1, '22.1'],
  [/ted$/, 2, '22'],
  //--> Jason M. Adams

  [/anges$/, 1, '23'],
  [/aining$/, 3, '24'],
  [/acting$/, 3, '25'],
  [/ttings?$/, 't', '26'],
  [/viding$/, 'vide', '27'],
  [/ssed$/, 2, '28'],
  [/sed$/, 1, '29'],
  [/titudes$/, 1, '30'],

  //--< Jason M. Adams
  [/oed$/, 1, '31.3'],
  [/d?oes$/, 2, '31.2'],
  [/[oaiu]ked$/, 1, '31.1'],
  [/[aiu]med/, 1, '31'],
  //--> Jason M. Adams

  [/ulted$/, 2, '32'],
  [/uming$/, 'ume', '33'],
  [/fulness$/, 4, '34'],
  [/ousness$/, 4, '35'],
  [/r[aeiou]bed$/, 1, '36.1'],
  [/beds?$/, 'b', '36'],
  [/ssings?$/, 'ss', '37'],
  [/ulting$/, 3, '38'],
  [/vings?$/, 'v', '39'],
  [/vings$/],
  [/eadings?$/, 'ead', '40.7'],
  [/oadings?$/, 'oad', '40.6'],
  [/edings?$/, 'ed', '40.5'],
  [/ddings?$/, 'd', '40.4'],
  [/ldings?$/, 'ld', '40.3'],
  [/rdings?$/, 'rd', '40.2'],
  [/ndings?$/, 'nd', '40.1'],
  [/dings?/, 'de', '40'],
  [/llings?$/, 'l', '41'],
  [/ealings?$/, 'eal', '42.4'],
  [/olings?$/, 'ol', '42.3'],
  [/ailings?$/, 'ail', '42.2'],
  [/elings?$/, 'el', '42.1'],
  [/lings?$/, 'le', '42'],
  [/nged$/, 1, '43.2'],
  [/gged$/, 3, '43.1'],
  [/ged$/, 1, '43'],
  [/mmings?$/, 'm', '44.3'],
  [/rming$/, 3, '44.2'],
  [/lming$/, 3, '44.1'],
  [/mings?$/, 'me', '44'],
  [/ngings?$/, 'ng', '45.2'],
  [/ggings?$/, 'g', '45.1'],
  [/gings?$/, 'ge', '45'],
  [/aning$/, 3, '46.6'],
  [/ening$/, 3, '46.5'],
  [/gning$/, 3, '46.4'],
  [/nning$/, 4, '46.3'],
  [/oning$/, 3, '46.2'],
  [/rning$/, 3, '46.1'],
  [/ning$/, 'ne', '46'],
  [/stings?$/, 'st', '47'],
  [/etings?$/, 'et', '48.4'],
  [/pting$/, 3, '48.3'],
  [/ntings?$/, 'nt', '48.2'],
  [/cting$/, 3, '48.1'],
  [/tings?$/, 'ct', '48.1'],
  [/ssed$/, 2, '49'],
  [/les$/, 1, '50'],
  [/tes$/, 1, '51'],
  [/zed$/, 1, '52'],
  [/lled$/, 2, '53'],
  [/irings?$/, 'ire', '54.4'],
  [/urings?$/, 'ure', '54.3'],
  [/ncings?$/, 'nce', '54.2'],
  [/zing$/, 3, '54.1'],
  [/sings?$/, 'se', '54'],
  [/lling$/, 3, '55'],
  [/ied$/, 'e', '56'],
  [/ating$/, 'ate', '57'],

  //--< Jason M. Adams
  [/dying$/, 'die', '58.2'],
  [/^lying$/, 'lie', '58.2'],
  [/tying$/, 'tie', '58.2'],
  //--> Jason M. Adams

  [/thing$/, null, '58.1'],
  [/things$/, 1, '58.1'],
  [/(.*\w{2})ings?$/, '$1', '58'],
  [/ies$/, 'y', '59'],
  [/lves$/, 'lf', '60.1'],
  [/ves$/, 1, '60'],
  [/aped$/, 1, '61.3'],
  [/uded$/, 1, '61.2'],
  [/oded$/, 1, '61.1'],

  // NOTE: same rule as 22.1, but present uselessly in all reference
  // implementations
  // [/ated$/, 1, '61'],
  [/(.*\w{2})eds?$/, '$1', '62'],

  //--< Jason M. Adams
  [/des$/, 1, '63.10'],
  [/res$/, 1, '63.9'],
  //--> Jason M. Adams

  [/pes$/, 1, '63.8'],
  [/mes$/, 1, '63.7'],
  [/ones$/, 1, '63.6'],
  [/izes$/, 1, '63.5'],
  [/ures$/, 1, '63.4'],
  [/ines$/, 1, '63.3'],
  [/ides$/, 1, '63.2'],

  //--< Jason M. Adams
  [/[kg]es$/, 1, '63.1'],
  //--> Jason M. Adam

  [/es$/, 2, '63'],
  [/is$/, 'e', '64'],
  [/ous$/, null, '65'],
  [/ums$/, null, '66'],
  [/us$/, null, '67'],
  [/s$/, 1, '68']
];

/**
 * Function stemming the given world using the UEALite stemmer.
 *
 * @param  {string} word - The word to stem.
 * @return {object}      - An object containing the stemmed word and the applied
 *                         rule.
 */
export function withRule(word) {
  let stem = word;

  // Is the given word problematic?
  if (PROBLEMS.has(word))
    return {rule: '90', stem};

  // If the word contains apostrophe(s)
  if (/'/.test(word)) {

    // Possessive (both singular & plural)
    if (/'s?$/i.test(word))
      stem = stem.replace(/'s?$/i, '');

    // Expand various contractions
    for (let i = 0, l = CONTRACTIONS.length; i < l; i++)
      stem = stem.replace(...CONTRACTIONS[i]);

    return {rule: '94', stem};
  }

  // Applying rules
  for (let i = 0, l = RULES.length; i < l; i++) {
    const [pattern, replacement, rule] = RULES[i];

    // Replacing through string
    if (typeof replacement === 'string') {
      const newStem = stem.replace(pattern, replacement);

      if (newStem !== stem)
        return {rule, stem: newStem};
    }

    // Attempting to match the pattern
    if (pattern.test(stem)) {
      if (replacement)
        stem = stem.slice(0, -replacement);

      return {rule, stem};
    }
  }

  return {rule: '0', stem: word};
}

export default function ueaLite(word) {
  return withRule(word).stem;
}
