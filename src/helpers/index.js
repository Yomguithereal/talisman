/* eslint no-cond-assign: 0 */
/**
 * Talisman helpers
 * =================
 *
 * Miscellaneous helper functions.
 */

/**
 * Function returning all the matches of a regular expression over the given
 * string.
 *
 * @param  {RegExp} pattern - The regular expression to apply.
 * @param  {string} string  - The string to match.
 * @return {array}          - An array of matches.
 */
export function findall(pattern, string) {
  const matches = [];

  if (!pattern.global) {
    const result = pattern.exec(string);

    if (result)
      matches.push(result);

    return matches;
  }

  let match;
  while (match = pattern.exec(string))
    matches.push(match);

  // Resetting state of the Regex for safety
  pattern.lastIndex = 0;

  return matches;
}

/**
 * Function normalizing the given variable into a proper array sequence.
 *
 * @param  {mixed} target - The variable to normalize as a sequence.
 * @return {array}        - The resulting sequence.
 */
export function seq(target) {
  return typeof target === 'string' ? target.split('') : target;
}

/**
 * Function squeezing the given sequence by dropping consecutive duplicates.
 *
 * Note: the name was actually chosen to mimic Ruby's naming since I did not
 * find any equivalent in other standard libraries.
 *
 * @param  {mixed} target - The sequence to squeeze.
 * @return {array}        - The resulting sequence.
 */
export function squeeze(target) {
  const isString = typeof target === 'string',
        sequence = seq(target),
        squeezed = [sequence[0]];

  for (let i = 1, l = sequence.length; i < l; i++) {
    if (sequence[i] !== sequence[i - 1])
      squeezed.push(sequence[i]);
  }

  return isString ? squeezed.join('') : squeezed;
}

/**
 * Function creating an index of mapped letters.
 *
 * @param  {string} first  - First letters.
 * @param  {string} second - Second letters.
 * @return {object}        - The resulting index.
 */
export function translation(first, second) {
  const index = {};

  first = first.split('');
  second = second.split('');

  if (first.length !== second.length)
    throw Error('talisman/helpers#translation: given strings don\'t have the same length.');

  for (let i = 0, l = first.length; i < l; i++)
    index[first[i]] = second[i];

  return index;
}
