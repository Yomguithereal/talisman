/**
 * Talisman clustering/k-means
 * ============================
 *
 * Function related to k-means clustering.
 *
 * [Reference]: https://en.wikipedia.org/wiki/K-means_clustering
 */
import euclidean from '../metrics/distance/euclidean';
import {mean} from '../helpers/vectors';
import sample from 'lodash/sample';

/**
 * Helpers.
 */
function compareCentroids(a, b) {
  for (let i = 0, l = a.length; i < l; i++) {
    for (let j = 0, m = a[i].length; j < m; j++) {
      if (a[i][j] !== b[i][j])
        return false;
    }
  }

  return true;
}

/**
 * Function performing a k-means clustering on the given dataset.
 *
 * @param  {array}    dataset                 - An array of vectors of n
 *                                              dimensions.
 * @param  {number}   [k]                     - The number of clusters to
 *                                              produce.
 * @param  {object}   [options]               - Custom options.
 * @param  {function} [options.distance]      - The distance function to use.
 * @param  {number}   [options.maxIterations] - Max nb of iterations to perform.
 * @return {array}                            - An array of clusters.
 *
 * @throws {Error} Will throw if the given parameters are not valid.
 */
export default function kMeans(dataset, k = 8, options = {}) {
  const {
    distance = euclidean,
    maxIterations = 300
  } = options;

  if (!Array.isArray(dataset))
    throw Error('talisman/clustering/k-means: dataset should be an array of vectors.');

  if (typeof k !== 'number' || k <= 0)
    throw Error('talisman/clustering/k-means: k should be > 0.');

  if (typeof distance !== 'function')
    throw Error('talisman/clustering/k-means: the distance option should be a function.');

  if (typeof maxIterations !== 'number' || maxIterations <= 0)
    throw Error('talisman/clustering/k-means: the maxIterations option should be > 0.');

  // First we need to find random centroids to start
  let centroids = new Array(k);

  for (let i = 0; i < k; i++)
    centroids[i] = sample(dataset);

  let iterations = 0,
      oldCentroids,
      clusters;

  // While we don't converge, or haven't performed the allowed iterations
  while (
    iterations < maxIterations &&
    (!oldCentroids || !compareCentroids(centroids, oldCentroids))
  ) {

    // Initializing the clusters
    clusters = new Array(k);

    for (let i = 0, l = clusters.length; i < l; i++)
      clusters[i] = [];

    // Iterating through the dataset's vectors
    for (let i = 0, l = dataset.length; i < l; i++) {
      const vector = dataset[i];

      // Finding the closest centroid
      let min = Infinity,
          minIndex = 0;

      for (let j = 0, m = centroids.length; j < m; j++) {
        const d = distance(vector, centroids[j]);

        if (d < min) {
          min = d;
          minIndex = j;
        }
      }

      // Pushing the vector in the correct cluster
      clusters[minIndex].push(vector);
    }

    // If any of the clusters is empty, we fill it with a random vector
    for (let i = 0, l = clusters.length; i < l; i++) {
      const cluster = clusters[i];

      if (cluster.length)
        continue;

      cluster.push(sample(dataset));
    }

    // We now find the new centroids
    oldCentroids = centroids;
    centroids = new Array(k);

    for (let i = 0, l = clusters.length; i < l; i++)
      centroids[i] = mean(clusters[i]);

    iterations++;
  }

  // Finally returning the clusters
  return clusters;
}
