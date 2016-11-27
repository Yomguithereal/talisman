/**
 * Talisman regexp
 * ================
 *
 * Some RegExp-related helpers.
 */

/**
 * Function escaping a string for insertion in a regular expression.
 *
 * @param  {string} string - The string to escape.
 * @return {string}        - The escaped string.
 */
const RE = /([|\\{}()[\]^$+*?.\-])/g;

export function escapeRegexp(string) {
  return string.replace(RE, '\\$1');
}

/**
 * Function creating a fuzzy matching pattern from the given query.
 *
 * @param  {string} string - The string to escape.
 * @return {string}        - The created pattern.
 */
export function createFuzzyPattern(query) {
  return query
    .split('')
    .map(character => {
      return `(${escapeRegexp(character)})`;
    })
    .join('.*?');
}
