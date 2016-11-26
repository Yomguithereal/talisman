/**
 * Talisman clustering/inverted-index
 * ===================================
 *
 * Clustering algorithm gathering tokenized documents into an inverted index
 * before applying distance metrics.
 */

/**
 * Inverted index clustering function.
 *
 * @param  {object}   options - Options:
 * @param  {function}   distance - Distance function to use.
 * @param  {number}     radius   - Radius of the clusters.
 * @param  {array}    data    - Data points.
 * @return {array}            - List of clusters.
 */
export default function invertedIndex(options, data) {
  const distance = options.distance,
        radius = options.radius;

  if (typeof distance !== 'function')
    throw new Error('talisman/clustering/inverted-index: `distance` option should be a function.');

  if (typeof radius !== 'number' || radius < 0)
    throw new Error('talisman/clustering/inverted-index: `radius` option should be a number >= 0.');

  const blocks = new Map();

  for (let i = 0, l = data.length; i < l; i++) {
    const doc = data[i];

    for (let j = 0, m = doc.length; j < m; j++) {
      const token = doc[j];

      let set;

      if (!blocks.has(token)) {
        set = new Set();
        blocks.set(token, set);
      }
      else {
        set = blocks.get(token);
      }

      set.add(doc);
    }
  }

  const clusterMap = new Map();

  blocks.forEach(function(block) {
    if (block.size < 2)
      return;

    const docs = Array.from(block);

    for (let i = 0, l = docs.length; i < l; i++) {
      const a = docs[i];

      for (let j = 1 + i; j < l; j++) {
        const b = docs[j];

        if (clusterMap.has(a) && clusterMap.get(a).has(b))
          continue;
        if (clusterMap.has(b) && clusterMap.get(b).has(a))
          continue;

        const d = distance(a, b);

        if (d <= radius) {
          let set;

          if (!clusterMap.has(a)) {
            set = new Set();
            set.add(a);
            clusterMap.set(a, set);
          }
          else {
            set = clusterMap.get(a);
          }

          set.add(b);
        }
      }
    }
  });

  const clusters = [];

  clusterMap.forEach(function(set) {
    clusters.push(Array.from(set));
  });

  // TODO: returned clusters are fuzzy (overlaps are possible)
  // Should probably refine the method by just creating edges and
  // finding connected components as usual...
  return clusters;
}
