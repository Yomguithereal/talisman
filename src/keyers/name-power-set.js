/**
 * Talisman keyers/name-power-set
 * ===============================
 *
 * Keyer returning an opinionated power set of what might be the ways to
 * write the given name so that one can try to perform fuzzy matching on
 * partial names such as "P. Henry" & "Philip Henry", for instance.
 */
import generatorics from 'generatorics';
import uniq from 'lodash/uniq';
import words from '../tokenizers/words';

// TODO: option for full initials? (else if solution involves only abbrev, we skip)
// TODO: disallow single token (on option)
// TODO: option to skip or not
// TODO: possibility to pass tokens rather than a string
// TODO: tweak power set token number threshold (heuristic function genre n or n - 1 etc.)

/**
 * Function expanding token by multiplexing tokens that are not initials.
 *
 * @param  {array} tokens - List of tokens.
 * @param  {array}
 */
function expand(tokens) {
  for (let i = 0, l = tokens.length; i < l; i++) {
    if (tokens[i].length > 1)
      tokens[i] = [tokens[i], tokens[i][0]];
  }

  return tokens;
}

/**
 * Permutation helper that will expand token possibilities.
 *
 * @param  {array} code - List of possibly expanded tokens.
 * @param  {array}
 */
function permutations(code) {
  const codes = [[]];

  for (let i = 0, l = code.length; i < l; i++) {
    const current = code[i];

    if (typeof current === 'object') {

      // Doubling the codes
      for (let j = 0, m = codes.length * (current.length - 1); j < m; j++)
        codes.push(codes[j].slice());

      // Filling the codes
      const offset = codes.length / current.length;

      for (let j = 0, k = 0, m = current.length; j < m; j++) {
        const encoding = current[j];

        while (k < offset) {
          codes[k + j * offset].push(encoding);
          k++;
        }

        k = 0;
      }
    }
    else {

      for (let j = 0, m = codes.length; j < m; j++)
        codes[j].push(current);
    }
  }

  return codes;
}

/**
 * Function returning the name power set.
 *
 * @param  {string} name - Target name.
 * @param  {array}
 */
export default function namePowerSet(name) {

  // Gathering items which are the sorted unique tokens of the name
  const tokens = uniq(words(name)).sort();

  if (tokens.length < 2)
    return [tokens];

  const powerSet = Array
    .from(generatorics.clone.powerSet(tokens))
    .filter(set => set.length > 1)
    .map(expand)
    .map(permutations);

  const possibilities = [];

  for (let i = 0, l = powerSet.length; i < l; i++) {
    const set = powerSet[i];

    for (let j = 0, m = set.length; j < m; j++) {
      if (!set[j].every(token => token.length < 2))
        possibilities.push(set[j]);
    }
  }

  return possibilities;
}
