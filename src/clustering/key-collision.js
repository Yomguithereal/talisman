/**
 * Talisman clustering/key-collision
 * ==================================
 *
 * Simple clustering algorithm running in linear time just applying a
 * keying function to each data point and grouping them when the resulting
 * keys collide.
 */

/**
 * Key collision clustering function.
 *
 * @param  {object}   options - Options:
 * @param  {function}   keyer - Function used to create a key for each item.
 * @param  {array}    data    - Data points.
 * @return {array}            - List of clusters.
 */
export default function keyCollision(options, data) {
  const keyer = options.keyer;

  if (typeof keyer !== 'function')
    throw new Error('talisman/clustering/key-collision: `keyer` option should be a function.');

  const map = Object.create(null);

  for (let i = 0, l = data.length; i < l; i++) {
    const item = data[i],
          key = keyer(item);

    if (!map[key])
      map[key] = [];
    map[key].push(item);
  }

  const clusters = [];

  for (const k in map)
    clusters.push(map[k]);

  return clusters;
}
