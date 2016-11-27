/**
 * Talisman clustering/blocking
 * =============================
 *
 * Clusterer dispatching documents to blocks which we will then cluster. A
 * document may be attached to more than one block since the algorithm uses
 * an inverted index.
 *
 * [Note]: this clusterer actually generates fuzzy clusters, meaning that one
 * data point may be present in several clusters.
 */

/**
 * Inverted index clustering function.
 *
 * @param  {object}   options - Options:
 * @param  {function}   blocks   - Function returning the documents' blocks.
 * @param  {function}   distance - Distance function to use.
 * @param  {number}     radius   - Radius of the clusters.
 * @param  {array}    data    - Data points.
 * @return {array}            - List of clusters.
 */
export default function blocking(options, data) {
  const blocker = options.blocks || options.block,
        distance = options.distance,
        radius = options.radius;

  if (typeof blocker !== 'function')
    throw new Error('talisman/clustering/blocking: `blocker` option should be a function.');

  if (typeof distance !== 'function')
    throw new Error('talisman/clustering/blocking: `distance` option should be a function.');

  if (typeof radius !== 'number' || radius < 0)
    throw new Error('talisman/clustering/blocking: `radius` option should be a number >= 0.');

  const blocks = new Map();

  for (let i = 0, l = data.length; i < l; i++) {
    const doc = data[i],
          tokens = [].concat(blocker(doc));

    for (let j = 0, m = tokens.length; j < m; j++) {
      const token = tokens[j];

      let list;

      if (!blocks.has(token)) {
        list = [];
        blocks.set(token, list);
      }
      else {
        list = blocks.get(token);
      }

      list.push(doc);
    }
  }

  const clusterMap = new Map();

  blocks.forEach(function(block) {
    if (block.size < 2)
      return;

    for (let i = 0, l = block.length; i < l; i++) {
      const a = block[i];

      for (let j = 1 + i; j < l; j++) {
        const b = block[j];

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

  return clusters;
}
