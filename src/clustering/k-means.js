/**
 * Talisman clustering/k-means
 * ============================
 *
 * Function related to k-means clustering.
 *
 * [Reference]: https://en.wikipedia.org/wiki/K-means_clustering
 */
import euclidean from '../metrics/distance/euclidean';
import {vec} from '../helpers/vectors';
import {createRandom, createSample} from '../helpers/random';

/**
 * Default options for k-means clustering.
 */
const DEFAULTS = {
  k: 8,
  distance: euclidean,
  maxIterations: 300,
  initialCentroids: null,
  rng: Math.random
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
 * @param {function}       [options.sampler]          - Sampling function.
 * @param {function}       [options.rng]              - RNG function to use.
 */
export class KMeans {
  constructor(data, options = {}) {

    // Enforcing data validity
    if (!Array.isArray(data))
      throw Error('talisman/clustering/k-means: dataset should be an array of vectors.');

    // Properties
    this.data = data;
    this.dimension = this.data[0].length;
    this.iterations = 0;
    this.centroids = null;
    this.previousCentroids = null;

    // Options
    const rng = options.rng || DEFAULTS.rng;

    if (typeof rng !== 'function')
      throw new Error('talisman/clustering/k-means: `rng` should be a function.');

    this.k = options.k || DEFAULTS.k;
    this.distance = options.distance || DEFAULTS.distance;
    this.maxIterations = options.maxIterations || DEFAULTS.maxIterations;
    this.sampler = createSample(rng).bind(null, this.k);
    this.randomVectorIndex = createRandom(rng).bind(null, 0, this.data.length);

    // Enforcing correct options
    if (typeof this.k !== 'number' || this.k <= 0)
      throw Error('talisman/clustering/k-means: `k` should be > 0.');

    if (this.data.length < this.k)
      throw Error('talisman/clustering/k-means: k is greater than the number of provided vectors.');

    if (typeof this.distance !== 'function')
      throw Error('talisman/clustering/k-means: the `distance` option should be a function.');

    if (typeof this.maxIterations !== 'number' || this.maxIterations <= 0)
      throw Error('talisman/clustering/k-means: the `maxIterations` option should be > 0.');

    this.clusters = new Uint16Array(this.data.length);

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
    }
    else {

      // Else, we're gonna choose the initial centroids randomly
      initialCentroids = this.sampler(this.data);
    }

    // Ensuring the starting centroids are correct
    if (!Array.isArray(initialCentroids))
      throw Error('talisman/clustering/k-means: `initialCentroids` are not an array or the function you provided to compute them returned invalid data (could be your `sampler`).');

    if (initialCentroids.length !== this.k)
      throw Error(`talisman/clustering/k-means: you should provide k centroids (got ${initialCentroids.length} instead of ${this.k}).`);

    if (!initialCentroids.every(centroid => Array.isArray(centroid) && centroid.length === this.dimension))
      throw Error('talisman/clustering/k-means: at least one of the provided or computed centroids is not of the correct dimension.');

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

    // Initializing clusters states
    const clusterStates = new Uint8Array(this.k);

    // Iterating through the dataset's vectors
    for (let i = 0, l = this.data.length; i < l; i++) {
      const vector = this.data[i];

      // Finding the closest centroid
      let min = Infinity,
          centroidIndex = 0;

      for (let j = 0; j < this.k; j++) {
        const d = this.distance(vector, this.centroids[j]);

        if (d < min) {
          min = d;
          centroidIndex = j;
        }
      }

      // Mapping the vector to the correct centroid index
      this.clusters[i] = centroidIndex;

      // Indicating our cluster isn't empty anymore
      clusterStates[centroidIndex] = 1;
    }

    // If any of the clusters is empty, we need to give it a random vector
    for (let i = 0; i < this.k; i++) {
      if (!clusterStates[i]) {

        // Finding a random vector
        const randomVectorIndex = this.randomVectorIndex();

        // Let's put it in our empty cluster
        this.clusters[randomVectorIndex] = i;
      }
    }

    // We now find the new centroids
    this.previousCentroids = this.centroids;
    this.centroids = new Array(this.k);

    for (let i = 0; i < this.k; i++)
      this.centroids[i] = vec(this.dimension, 0);

    const sizes = vec(this.dimension, 0);

    for (let i = 0, l = this.data.length; i < l; i++) {
      const vector = this.data[i],
            clusterIndex = this.clusters[i];

      for (let j = 0; j < this.dimension; j++)
        this.centroids[clusterIndex][j] += vector[j];

      sizes[clusterIndex]++;
    }

    for (let i = 0; i < this.k; i++) {
      for (let j = 0; j < this.dimension; j++)
        this.centroids[i][j] /= sizes[i];
    }

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

    // Now we need to "compile" the clusters
    const clusters = new Array(this.k);

    for (let i = 0; i < this.k; i++)
      clusters[i] = [];

    for (let i = 0, l = this.data.length; i < l; i++)
      clusters[this.clusters[i]].push(this.data[i]);

    return clusters;
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
  const clusterer = new KMeans(data, options);

  const clusters = clusterer.run();

  return clusters;
}
