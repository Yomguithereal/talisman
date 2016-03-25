/**
 * Talisman helpers
 * =================
 *
 * Miscellaneous helper functions.
 */

/**
 * Function normalizing the given variable into a proper array sequence.
 *
 * @param  {mixed} target - The variable to normalize as a sequence.
 * @return {array}        - The resulting sequence.
 */
export function seq(target) {
  return typeof target === 'string' ? target.split('') : target;
}
