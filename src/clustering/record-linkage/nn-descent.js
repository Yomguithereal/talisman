/* eslint no-constant-condition: 0 */
/**
 * Talisman clustering/record-linkage/nn-descent
 * ==============================================
 *
 * JavaScript implementation of the NN-Descent algorithm designed to generate
 * k-NN graphs approximations in a performant fashion.
 *
 * [Reference]:
 * http://www.cs.princeton.edu/cass/papers/www11.pdf
 *
 * [Article]:
 * "Efficient K-Nearest Neighbor Graph Construction for Generic Similarity
 * Measures" Wei Dong, Moses Charikar, Kai Li.
 */
import RecordLinkageClusterer from './abstract';
import {
  createChoice,
  createDangerousButPerformantSample
} from '../../helpers/random';

// TODO: JSDoc
// TODO: easy to create a eta-NN version instead probably

/**
 * Defaults.
 */
const DEFAULTS = {

  // Sampling coefficient
  rho: 0.5,

  // Early termination coefficient
  delta: 0.001,

  // Maximum number of iterations to perform
  maxIterations: Infinity,

  // RNG to use
  rng: Math.random
};

/**
 * NN-Descent Clusterer class.
 *
 * @constructor
 */
export class NNDescentClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);

    // Checking rho
    this.rho = params.rho || DEFAULTS.rho;

    if (typeof this.rho !== 'number' || this.rho > 1 || this.rho <= 0)
      throw new Error('talisman/clustering/record-linkage/nn-descent: rho should be a number greater than 0 and less or equal than 1.');

    // Checking delta
    this.delta = params.delta || DEFAULTS.delta;

    if (typeof this.delta !== 'number' || this.delta >= 1 || this.delta <= 0)
      throw new Error('talisman/clustering/record-linkage/nn-descent: delta should be a number greater than 0 and less than 1.');

    // Checking maxIterations
    this.maxIterations = params.maxIterations || DEFAULTS.maxIterations;

    if (this.maxIterations <= 0)
      throw new Error('talisman/clustering/record-linkage/nn-descent: maxIterations should be > 0');

    // Checking similarity
    this.similarity = params.similarity;

    if (typeof this.similarity !== 'function')
      throw new Error('talisman/clustering/record-linkage/nn-descent: similarity should be a function.');

    // Checking RNG
    this.rng = params.rng || DEFAULTS.rng;

    if (typeof this.rng !== 'function')
      throw new Error('talisman/clustering/record-linkage/nn-descent: rng should be a function.');

    this.sampleFunction = createDangerousButPerformantSample(this.rng);
    this.choiceFunction = createChoice(this.rng);

    // Checking k
    this.k = params.k;

    if (typeof this.k !== 'number' || this.k <= 0)
      throw new Error('talisman/clustering/record-linkage/nn-descent: k should be > 0');

    // Properties
    this.iterations = 0;
    this.c = 0;
  }

  sampleItems(forItem) {
    const items = new Set(this.sampleFunction(this.k, this.items));

    // The original item should obviously not be in the sample
    if (items.has(forItem)) {
      items.delete(forItem);

      while (items.size < this.k)
        items.add(this.choiceFunction(this.items));
    }

    return Array.from(items).map(item => {
      return {
        item,
        similarity: this.similarity(item, forItem),
        processed: false
      };
    });
  }

  sample(items, n) {

    // NOTE: Probably possible to mutate here, but not sure.
    if (items.length <= n)
      return items.slice();

    return this.sampleFunction(n, items);
  }

  pickFalses(elements) {
    const list = [];

    for (let i = 0, l = elements.length; i < l; i++) {
      const element = elements[i];

      if (element.processed)
        list.push(element.item);
    }

    return list;
  }

  pickTruesAndMarkFalses(elements) {
    const list = [];

    for (let i = 0, l = elements.length; i < l; i++) {
      const element = elements[i];

      if (!element.processed && this.rng() < this.rho) {
        element.processed = true;
        list.push(element.item);
      }
    }

    return list;
  }

  reverse(lists) {
    const R = new Map();

    for (let i = 0, l = this.items.length; i < l; i++)
      R.set(this.items[i], []);

    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i],
            list = lists.get(item);

      for (let j = 0, m = list.length; j < m; j++)
        R.get(list[j]).push(item);
    }

    return R;
  }

  union(a, b) {
    const set = new Set(a);

    for (let i = 0, l = b.length; i < l; i++)
      set.add(b[i]);

    return Array.from(set);
  }

  updateNN(K, item, similarity) {

    // NOTE: this is a naive approach that could be bested by a priority queue
    // or by caching the min similarity + holding elements in a Set
    let minSimilarity = Infinity,
        minSimilarityIndex = -1;

    for (let i = 0, l = K.length; i < l; i++) {
      const element = K[i];

      if (item === element.item)
        return;

      if (element.similarity < minSimilarity) {
        minSimilarity = element.similarity;
        minSimilarityIndex = i;
      }
    }

    if (minSimilarity < similarity) {

      // Replacing the item
      K[minSimilarityIndex] = {
        item,
        similarity,
        processed: false
      };

      // NOTE: we could avoid to store c in instance state by making this
      // function return something meaningful.
      this.c++;
    }
  }

  run() {
    const B = new Map(),
          rhok = this.rho * this.k;

    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i];

      B.set(item, this.sampleItems(item));
    }

    const before = new Map(),
          current = new Map();

    // Performing the iterations
    while (true) {
      this.iterations++;
      this.c = 0;

      for (let i = 0, l = this.items.length; i < l; i++) {
        const item = this.items[i];

        before.set(item, this.pickFalses(B.get(item)));
        current.set(item, this.pickTruesAndMarkFalses(B.get(item)));
      }

      const before2 = this.reverse(before),
            current2 = this.reverse(current);

      for (let i = 0, l = this.items.length; i < l; i++) {
        const item = this.items[i];

        before.set(
          item,
          this.union(
            before.get(item),
            this.sample(before2.get(item), rhok)
          )
        );

        current.set(
          item,
          this.union(
            current.get(item),
            this.sample(current2.get(item), rhok)
          )
        );

        const currentTargets = current.get(item),
              beforeTargets = before.get(item);

        for (let j = 0, m = currentTargets.length; j < m; j++) {
          const u1 = currentTargets[j];

          for (let k = j + 1; k < m; k++) {
            const u2 = currentTargets[k],
                  similarity = this.similarity(u1, u2);

            this.updateNN(B.get(u1), u2, similarity);
            this.updateNN(B.get(u2), u1, similarity);
          }

          for (let k = 0, n = beforeTargets.length; k < n; k++) {
            const u2 = beforeTargets[k];

            if (u1 === u2)
              continue;

            const similarity = this.similarity(u1, u2);

            this.updateNN(B.get(u1), u2, similarity);
            this.updateNN(B.get(u2), u1, similarity);
          }
        }
      }

      // Termination?
      // console.log('iteration', this.c, this.delta * this.items.length * this.k);
      if (this.iterations >= this.maxIterations ||
          this.c < this.delta * this.items.length * this.k)
        break;
    }

    return B;
  }
}

/**
 * Shortcut function for the NN-Descent clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function nnDescent(params, items) {
  const clusterer = new NNDescentClusterer(params, items);

  return clusterer.run();
}
