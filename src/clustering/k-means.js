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
import sampleSize from 'lodash/sampleSize';

/**
 * Default options for k-means clustering.
 */
const DEFAULTS = {
  k: 8,
  distance: euclidean,
  maxIterations: 300,
  initialCentroids: null
};

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
 * KMeans class used to fine tune the clustering when needed & handling
 * the internal state of the process.
 *
 * @constructor
 * @param {array}          data                       - Array of vectors.
 * @param {object}         options                    - Possible options:
 * @param {number}         [options.k]                - Number of clusters.
 * @param {function}       [options.distance]         - Distance function.
 * @param {number}         [options.maxIterations]
 *   - Maximum number of iterations.
 * @param {array|function} [options.initialCentroids]
 *   - Either an array of initial centroids or a function computing them.
 */
class KMeans {
  constructor(data, options = {}) {

    // Enforcing data validity
    if (!Array.isArray(data))
      throw Error('talisman/clustering/k-means: dataset should be an array of vectors.');

    // Properties
    this.data = data;
    this.dimensions = this.data[0].length;
    this.iterations = 0;
    this.centroids = null;
    this.previousCentroids = null;
    this.clusters = null;

    // Options
    this.k = options.k || DEFAULTS.k;
    this.distance = options.distance || DEFAULTS.distance;
    this.maxIterations = options.maxIterations || DEFAULTS.maxIterations;

    // Enforcing correct options
    if (typeof this.k !== 'number' || this.k <= 0)
      throw Error('talisman/clustering/k-means: `k` should be > 0.');

    if (typeof this.distance !== 'function')
      throw Error('talisman/clustering/k-means: the `distance` option should be a function.');

    if (typeof this.maxIterations !== 'number' || this.maxIterations <= 0)
      throw Error('talisman/clustering/k-means: the `maxIterations` option should be > 0.');

    // Computing initial centroids
    let initialCentroids = options.initialCentroids;

    if (initialCentroids) {

      // The user is giving the initial centroids:
      if (typeof initialCentroids === 'function')
        initialCentroids = initialCentroids(this.data, {
          k: this.k,
          distance: this.distance,
          maxIterations: this.maxIterations
        });

      if (!Array.isArray(initialCentroids))
        throw Error('talisman/clustering/k-means: `initialCentroids` should be an array or a function returning an array.');

      if (initialCentroids.length !== this.dimensions)
        throw Error('talisman/clustering/k-means: the initial centroids must be of same dimension than the input vectors.');
    }
    else {

      // Else, we're gonna choose the initial centroids randomly
      initialCentroids = sampleSize(this.data, this.dimensions);
    }

    this.centroids = initialCentroids;
  }

  /**
   * Method used to perform one iteration of the clustering algorithm.
   *
   * @return {KMeans} - Returns itself for chaining.
   */
  iterate() {

    // If the clustering has already converged, we break
    if (this.converged)
      return this;

    // Initializing the clusters
    this.clusters = new Array(this.k);

    for (let i = 0; i < this.k; i++)
      this.clusters[i] = [];

    // Iterating through the dataset's vectors
    for (let i = 0, l = this.data.length; i < l; i++) {
      const vector = this.data[i];

      // Finding the closest centroid
      let min = Infinity,
          minIndex = 0;

      for (let j = 0, m = this.dimensions; j < m; j++) {
        const d = this.distance(vector, this.centroids[j]);

        if (d < min) {
          min = d;
          minIndex = j;
        }
      }

      // Pushing the vector in the correct cluster
      this.clusters[minIndex].push(vector);
    }

    // If any of the clusters is empty, we fill it with a random vector.
    // NOTE: check the relevance of this method
    for (let i = 0, l = this.k; i < l; i++) {
      const cluster = this.clusters[i];

      if (!cluster.length)
        cluster.push(sampleSize(this.data, 1));
    }

    // We now find the new centroids
    this.previousCentroids = this.centroids;
    this.centroids = new Array(this.k);

    for (let i = 0, l = this.k; i < l; i++)
      this.centroids[i] = mean(this.clusters[i]);

    this.iterations++;

    // Checking if the clustering has converged
    this.converged = compareCentroids(this.previousCentroids, this.centroids);

    return this;
  }

  /**
   * Method used to start the clustering process.
   *
   * @return {array} - The resulting clusters.
   */
  run() {

    // While we don't converge or haven't performed the allowed iterations:
    while (!this.converged && this.iterations < this.maxIterations)
      this.iterate();

    return this.clusters;
  }
}

/**
 * Exporting a convenient function to perform simple k-means clustering.
 *
 * @param  {object} options - Clustering options.
 * @param  {array}  data    - Target dataset.
 * @param  {array}          - Resulting clusters.
 */
export default function kMeans(options, data) {
  const clustering = new KMeans(data, options);

  return clustering.run();
}
