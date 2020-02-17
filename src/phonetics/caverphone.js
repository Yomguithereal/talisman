/**
 * Talisman phonetics/caverphone
 * ==============================
 *
 * The caverphone algorithm, original & revisited.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Caverphone
 *
 * Original algorithm:
 * http://caversham.otago.ac.nz/files/working/ctp060902.pdf
 * Revisited algorithm:
 * http://caversham.otago.ac.nz/files/working/ctp150804.pdf
 *
 * [Author]:
 * David Hood (Caversham project)
 * http://caversham.otago.ac.nz/
 */
import deburr from 'lodash/deburr';

/**
 * Rules.
 */
const RULES = {
  original: [
    [/e$/g, ''],
    [/^(cou|rou|tou|enou|trou)gh/g, '$12f'],
    [/^gn/g, '2n'],
    [/^mb/g, 'm2'],
    [/cq/g, '2q'],
    [/ci/g, 'si'],
    [/ce/g, 'se'],
    [/cy/g, 'sy'],
    [/tch/g, '2ch'],
    [/c/g, 'k'],
    [/q/g, 'k'],
    [/x/g, 'k'],
    [/v/g, 'f'],
    [/dg/g, '2g'],
    [/tio/g, 'sio'],
    [/tia/g, 'sia'],
    [/d/g, 't'],
    [/ph/g, 'fh'],
    [/b/g, 'p'],
    [/sh/g, 's2'],
    [/z/g, 's'],
    [/^[aieou]/g, 'A'],
    [/[aeiou]/g, '3'],
    [/i/g, 'y'],
    [/^y3/g, 'Y3'],
    [/^y/g, 'A'],
    [/y/g, '3'],
    [/3gh3/g, '3kh3'],
    [/gh/g, '22'],
    [/g/g, 'k'],
    [/s+/g, 'S'],
    [/t+/g, 'T'],
    [/p+/g, 'P'],
    [/k+/g, 'K'],
    [/f+/g, 'F'],
    [/m+/g, 'M'],
    [/n+/g, 'N'],
    [/w3/g, 'W3'],
    [/wh3/g, 'Wh3'],
    [/w$/g, '3'],
    [/w/g, '2'],
    [/^h/g, 'A'],
    [/h/g, '2'],
    [/r3/g, 'R3'],
    [/r$/g, '3'],
    [/r/g, '2'],
    [/l3/g, 'L3'],
    [/l$/g, '3'],
    [/l/g, '2'],
    [/2/g, ''],
    [/3$/g, 'A'],
    [/3/g, '']
  ],
  revisited: [
    [/e$/g, ''],
    [/^(cou|rou|tou|enou|trou)gh/g, '$12f'],
    [/^gn/g, '2n'],
    [/mb$/g, 'mb'],
    [/cq/g, '2q'],
    [/c([iey])/g, 's$1'],
    [/tch/g, '2ch'],
    [/[cqx]/g, 'k'],
    [/v/g, 'f'],
    [/dg/g, '2g'],
    [/ti([oa])/g, 'si$1'],
    [/d/g, 't'],
    [/ph/g, 'fh'],
    [/b/g, 'p'],
    [/sh/g, 's2'],
    [/z/g, 's'],
    [/^[aeiou]/g, 'A'],
    [/[aeiou]/g, '3'],
    [/j/g, 'y'],
    [/^y3/g, 'Y3'],
    [/^y/g, 'A'],
    [/y/g, '3'],
    [/3gh3/g, '3kh3'],
    [/gh/g, '22'],
    [/g/g, 'k'],
    [/s+/g, 'S'],
    [/t+/g, 'T'],
    [/p+/g, 'P'],
    [/k+/g, 'K'],
    [/f+/g, 'F'],
    [/m+/g, 'M'],
    [/n+/g, 'N'],
    [/w3/g, 'W3'],
    [/wh3/g, 'Wh3'],
    [/w$/g, '3'],
    [/w/g, '2'],
    [/^h/g, 'A'],
    [/h/g, '2'],
    [/r3/g, 'R3'],
    [/r$/g, '3'],
    [/r/g, '2'],
    [/l3/g, 'L3'],
    [/l$/g, '3'],
    [/l/g, '2'],
    [/2/g, ''],
    [/3$/g, 'A'],
    [/3/g, '']
  ]
};

/**
 * Function taking a single name and computing its caverphone code.
 *
 * @param  {array}  rules - The rules to use.
 * @param  {string} name  - The name to process.
 * @return {string}       - The caverphone code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
function caverphone(rules, name) {

  if (typeof name !== 'string')
    throw Error('talisman/phonetics/caverphone: the given name is not a string.');

  // Preparing the name
  name = deburr(name)
    .toLowerCase()
    .replace(/[^a-z]/g, '');

  // Applying the rules
  for (let i = 0, l = rules.length; i < l; i++) {
    const [match, replacement] = rules[i];
    name = name.replace(match, replacement);
  }

  // Returning the padded code
  return name;
}

/**
 * Exporting functions.
 */
const original = caverphone.bind(null, RULES.original),
      revisited = caverphone.bind(null, RULES.revisited);

export default original;

export {
  original,
  revisited
};
