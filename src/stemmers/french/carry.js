/**
 * Talisman stemmers/french/carry
 * ===============================
 *
 * The Carry stemmer for the French language.
 *
 * [Reference]:
 * http://www.otlet-institute.org/docs/Carry.pdf
 *
 * [Article]:
 * Carry, un algorithme de désuffixation pour le français. M. Paternostre,
 * P. Francq, J. Lamoral, D. Wartel et M. Saerens. 2002
 *
 * [Note]:
 * This algorithm has been edited to handle some more cases and is thus
 * lightly different from the original paper (modifications by Guillaume
 * Plique).
 */

/**
 * Constants.
 */
const VOWELS = 'aeiouyâàëéêèïîôûùœæ',
      V = `[${VOWELS}]`,
      C = `[^${VOWELS}]`;

const LC = new RegExp(`^${C}+`),
      TV = new RegExp(`${V}+$`),
      M = new RegExp(`(${V}+${C}+)`);

/**
 * Helpers.
 */
function computeM(string) {

  // Removing leading consonants
  string = string
    .replace(LC, '')
    .replace(TV, '');

  return (string.match(M) || []).length;
}

/**
 * Rules.
 */
const STEP1 = [
  [0, 'issaient'],
  [0, 'ellement', 'el'],
  [0, 'issement'],
  [0, 'alement', 'al'],
  [0, 'eraient'],
  [0, 'iraient'],
  [0, 'eassent'],
  [0, 'ussent'],
  [0, 'amment'],
  [0, 'emment'],
  [0, 'issant'],
  [0, 'issent'],
  [0, 'assent'],
  [0, 'eaient'],
  [0, 'issait'],
  [0, 'èrent'],
  [0, 'erent'],
  [0, 'irent'],
  [0, 'erait'],
  [0, 'irait'],
  [0, 'iront'],
  [0, 'eront'],
  [0, 'ement'],
  [0, 'aient'],
  [0, 'îrent'],
  [0, 'eont'],
  [0, 'eant'],
  [0, 'eait'],
  [0, 'ient'],
  [0, 'ent'],
  [0, 'ont'],
  [0, 'ant'],
  [0, 'eât'],
  [0, 'ait'],
  [0, 'at'],
  [0, 'ât'],
  [0, 'it'],
  [0, 'ît'],
  [0, 't'],
  [0, 'uction'],
  [1, 'ication'],
  [1, 'iation'],
  [1, 'ation'],
  [0, 'ition'],
  [0, 'tion'],
  [1, 'ateur'],
  [1, 'teur'],
  [0, 'eur'],
  [0, 'ier'],
  [0, 'er'],
  [0, 'ir'],
  [0, 'r'],
  [0, 'eassiez'],
  [0, 'issiez'],
  [0, 'assiez'],
  [0, 'ussiez'],
  [0, 'issez'],
  [0, 'assez'],
  [0, 'eriez'],
  [0, 'iriez'],
  [0, 'erez'],
  [0, 'irez'],
  [0, 'iez'],
  [0, 'ez'],
  [0, 'erai'],
  [0, 'irai'],
  [0, 'eai'],
  [0, 'ai'],
  [0, 'i'],
  [0, 'ira'],
  [0, 'era'],
  [0, 'ea'],
  [0, 'a'],
  [0, 'f', 'v'],
  [0, 'yeux', 'oeil'],
  [0, 'eux'],
  [0, 'aux', 'al'],
  [0, 'x'],
  [0, 'issante'],
  [1, 'atrice'], // Added
  [0, 'eresse'],
  [0, 'eante'],
  [0, 'easse'],
  [0, 'eure'],
  [0, 'esse'],
  [0, 'asse'],
  [0, 'ance'],
  [0, 'ence'],
  [0, 'aise'],
  [0, 'euse'],
  [0, 'oise', 'o'],
  [0, 'isse'],
  [0, 'ante'],
  [0, 'ouse', 'ou'],
  [0, 'ière'],
  [0, 'ete'],
  [0, 'ète'],
  [0, 'iere'],
  [0, 'aire'],
  [1, 'ure'],
  [0, 'erie'],
  [0, 'étude'],
  [0, 'etude'],
  [0, 'itude'],
  [0, 'ade'],
  [0, 'isme'],
  [0, 'age'],
  [0, 'trice'],
  [0, 'cque', 'c'],
  [0, 'que', 'c'],
  [0, 'eille', 'eil'],
  [0, 'elle'],
  [0, 'able'],
  [0, 'iste'],
  [0, 'ulle', 'ul'],
  [0, 'gue', 'g'],
  [0, 'ette'],
  [0, 'nne', 'n'],
  [0, 'itée'],
  [0, 'ité'],
  [0, 'té'],
  [0, 'ée'],
  [0, 'é'],
  [0, 'usse'],
  [0, 'aise'],
  [0, 'ate'],
  [0, 'ite'],
  [0, 'ee'],
  [0, 'e'],
  [0, 'issements'],
  [0, 'issantes'],
  [1, 'ications'],
  [0, 'eassions'],
  [0, 'eresses'],
  [0, 'issions'],
  [0, 'assions'],
  [1, 'atrices'], // Added
  [1, 'iations'],
  [0, 'issants'],
  [0, 'ussions'],
  [0, 'ements'],
  [0, 'eantes'],
  [0, 'issons'],
  [0, 'assons'],
  [0, 'easses'],
  [0, 'études'],
  [0, 'etudes'],
  [0, 'itudes'],
  [0, 'issais'],
  [0, 'trices'],
  [0, 'eilles', 'eil'],
  [0, 'irions'],
  [0, 'erions'],
  [1, 'ateurs'],
  [1, 'ations'],
  [0, 'usses'],
  [0, 'tions'],
  [0, 'ances'],
  [0, 'entes'],
  [1, 'teurs'],
  [0, 'eants'],
  [0, 'ables'],
  [0, 'irons'],
  [0, 'irais'],
  [0, 'ences'],
  [0, 'ients'],
  [0, 'ieres'],
  [0, 'eures'],
  [0, 'aires'],
  [0, 'erons'],
  [0, 'esses'],
  [0, 'euses'],
  [0, 'ulles', 'ul'],
  [0, 'cques', 'c'],
  [0, 'elles'],
  [0, 'ables'],
  [0, 'istes'],
  [0, 'aises'],
  [0, 'asses'],
  [0, 'isses'],
  [0, 'oises', 'o'],
  [0, 'tions'],
  [0, 'ouses', 'ou'],
  [0, 'ières'],
  [0, 'eries'],
  [0, 'antes'],
  [0, 'ismes'],
  [0, 'erais'],
  [0, 'eâtes'],
  [0, 'eâmes'],
  [0, 'itées'],
  [0, 'ettes'],
  [0, 'ages'],
  [0, 'eurs'],
  [0, 'ents'],
  [0, 'ètes'],
  [0, 'etes'],
  [0, 'ions'],
  [0, 'ités'],
  [0, 'ites'],
  [0, 'ates'],
  [0, 'âtes'],
  [0, 'îtes'],
  [0, 'eurs'],
  [0, 'iers'],
  [0, 'iras'],
  [0, 'eras'],
  [1, 'ures'],
  [0, 'ants'],
  [0, 'îmes'],
  [0, 'ûmes'],
  [0, 'âmes'],
  [0, 'ades'],
  [0, 'eais'],
  [0, 'eons'],
  [0, 'ques', 'c'],
  [0, 'gues', 'g'],
  [0, 'nnes', 'n'],
  [0, 'ttes'],
  [0, 'îtes'],
  [0, 'tés'],
  [0, 'ons'],
  [0, 'ais'],
  [0, 'ées'],
  [0, 'ees'],
  [0, 'ats'],
  [0, 'eas'],
  [0, 'ts'],
  [0, 'rs'],
  [0, 'as'],
  [0, 'es'],
  [0, 'fs', 'v'],
  [0, 'és'],
  [0, 'is'],
  [0, 's'],
  [0, 'eau'],
  [0, 'au']
];

const STEP2 = [
  [1, 'ation'],
  [1, 'ition'],
  [1, 'tion'],
  [1, 'ent'],
  [1, 'el'],
  [0, 'i']
];

const STEP3 = [
  [0, 'll', 'l'],
  [0, 'mm', 'm'],
  [0, 'nn', 'n'],
  [0, 'pp', 'p'],
  [0, 'tt', 't'],
  [0, 'ss', 's'],
  [0, 'y'],
  [0, 't'],
  [0, 'qu', 'c']
];

/**
 * Function used to apply a set of rules to the current stem.
 *
 * @param  {string} stem - Target stem.
 * @return {string}      - The resulting stem.
 */
function applyRules(rules, stem) {

  for (let i = 0, l = rules.length; i < l; i++) {
    const [min, pattern, replacement = ''] = rules[i];

    if (stem.slice(-pattern.length) === pattern) {
      const newStem = stem.slice(0, -pattern.length) + replacement,
            m = computeM(newStem);

      if (m <= min)
        continue;

      return newStem;
    }
  }

  return stem;
}

/**
 * Function stemming the given world using the Carry algorithm for the French
 * language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function carry(word) {
  let stem = word.toLowerCase();

  stem = applyRules(STEP1, stem);
  stem = applyRules(STEP2, stem);
  stem = applyRules(STEP3, stem);

  return stem;
}
