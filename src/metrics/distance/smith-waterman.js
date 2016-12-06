/**
 * Talisman metrics/distance/smith-waterman
 * =========================================
 *
 * Functions computing the Smith-Waterman distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm
 *
 * [Article]:
 * Smith, Temple F. & Waterman, Michael S. (1981). "Identification of Common
 * Molecular Subsequences" (PDF). Journal of Molecular Biology. 147: 195–197.
 *
 * [Tags]: metric, string metric.
 */
import {similarity as identity} from './identity';

/**
 * Function returning the Smith-Waterman distance between two sequences.
 *
 * @param  {object}   options      - Options:
 * @param  {number}     gap        - Gap cost.
 * @param  {function}   similarity - Similarity function.
 * @param  {mixed}    a            - The first sequence to process.
 * @param  {mixed}    b            - The second sequence to process.
 * @return {number}                - The Smith-Waterman distance between a & b.
 */
export function score(options, a, b) {
  const {gap = 1, similarity = identity} = options;

  // Early terminations
  if (a === b)
    return a.length;

  const m = a.length,
        n = b.length;

  if (!m || !n)
    return 0;

  // TODO: Possibility to optimize for common prefix, but need to know max substitution cost

  const d = new Array(m + 1);

  let D = 0;

  for (let i = 0; i <= m; i++) {
    d[i] = new Array(2);
    d[i][0] = 0;
  }

  for (let j = 1; j <= n; j++) {
    d[0][j % 2] = 0;

    for (let i = 1; i <= m; i++) {
      const cost = similarity(a[i - 1], b[j - 1]);

      d[i][j % 2] = Math.max(
        0, // Start over
        d[i - 1][(j - 1) % 2] + cost, // Substitution
        d[i - 1][j % 2] - gap, // Insertion
        d[i][(j - 1) % 2] - gap // Deletion
      );

      // Storing max
      if (d[i][j % 2] > D)
        D = d[i][j % 2];
    }
  }

  return D;
}

/**
 * Exporting standard distance.
 */
const smithWaterman = score.bind(null, {});

export default smithWaterman;

