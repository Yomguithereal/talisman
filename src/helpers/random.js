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
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
export function createSample(rng) {
  const customRandom = createRandom(rng);

  return function(n, sequence) {
    const result = sequence.slice(),
          lastIndex = result.length - 1;

    let index = -1;

    while (++index < n) {
      const randomIndex = customRandom(index, lastIndex),
            value = result[randomIndex];

      result[randomIndex] = result[index];
      result[index] = value;
    }

    // Clamping the array
    result.length = n;

    return result;
  };
}

/**
 * Exporting default sample function.
 */
export const sample = createSample(Math.random);

/**
 * Creating a function returning a sample of size n using the provided RNG in
 * a performant but dangerous way. O(k) time & space is achieved by mutating
 * the target array and restoring it back to its original state afterwards.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
export function createDangerousButPerformantSample(rng) {
  const customRandom = createRandom(rng);

  return function(n, sequence) {
    const result = new Array(n),
          swaps = new Array(n),
          lastIndex = sequence.length - 1;

    let index = -1;

    while (++index < n) {
      const randomIndex = customRandom(index, lastIndex),
            value = sequence[randomIndex];

      sequence[randomIndex] = sequence[index];
      sequence[index] = value;
      result[index] = value;

      // Storing the swap so we can reverse it
      swaps[index] = randomIndex;
    }

    // Reversing the mutations
    while (--index >= 0) {
      const swap = swaps[index],
            value = sequence[index];

      sequence[index] = sequence[swap];
      sequence[swap] = value;
    }

    return result;
  };
}

/**
 * Exporting default sample function.
 */
export const dangerousButPerformantSample = createDangerousButPerformantSample(Math.random);

/**
 * Creating a function returning a shuffled array.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
export function createShuffle(rng) {
  const customSample = createSample(rng);

  return function(sequence) {
    return customSample(sequence.length, sequence);
  };
}

/**
 * Exporting default shuffle function.
 */
export const shuffle = createShuffle(Math.random);

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
