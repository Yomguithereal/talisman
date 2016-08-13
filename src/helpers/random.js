/**
 * Talisman helpers/random
 * ========================
 *
 * Helpers concerning random-handling functions.
 */

/**
 * Creating a function returning a random integer such as a <= N <= b.
 *
 * @param  {function} rng - RNG function returning uniform random.
 * @return {function}     - The created function.
 */
export function createRandom(rng) {

  return function(a, b) {
    return a + Math.floor(rng() * (b - a + 1));
  };
}

/**
 * Returning default random using `Math.random`.
 */
export const random = createRandom(Math.random);

/**
 * Function taking a length and a list of weights and aiming at
 * returning a random weighted index.
 *
 * @param {array}  weights - List of weights (must sum to 1).
 * @param {number}         - The random weighted index.
 */
export function weightedRandomIndex(weights) {
  const target = Math.random(),
        length = weights.length;

  let sum = 0;

  for (let i = 0; i < length; i++) {
    sum += weights[i];

    if (target <= sum)
      return i;
  }

  return length - 1;
}
