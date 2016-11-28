/**
 * Talisman metrics/distance/bag
 * ==============================
 *
 * Function computing the bag distance which works likewise which is the max
 * of the difference of multiset a & multiset b and the difference of
 * multiset b & multiset a.
 *
 * [Reference]:
 * http://www-db.disi.unibo.it/research/papers/SPIRE02.pdf
 *
 * [Article]:
 * String Matching with Metric Trees Using an Approximate Distance.
 * Ilaria Bartolini, Paolo Ciaccia, and Marco Patella.
 *
 * [Tags]: metric.
 */

/**
 * Function returning the bag distance.
 *
 * @param  {mixed}  a - The first sequence.
 * @param  {mixed}  b - The second sequence.
 * @return {number}   - The bag distance.
 */
export default function bag(a, b) {
  if (a === b)
    return 0;

  const ma = Object.create(null),
        mb = Object.create(null);

  let da = a.length,
      db = b.length;

  if (!da)
    return db;
  if (!db)
    return da;

  const longest = Math.max(da, db);

  for (let i = 0; i < longest; i++) {
    if (i < da) {
      const value = a[i];

      if (!ma[value])
        ma[value] = 0;
      ma[value]++;
    }

    if (i < db) {
      const value = b[i];

      if (!mb[value])
        mb[value] = 0;
      mb[value]++;
    }
  }

  for (const k in ma) {
    if (mb[k])
      da -= Math.min(ma[k], mb[k]);
  }

  for (const k in mb) {
    if (ma[k])
      db -= Math.min(mb[k], ma[k]);
  }

  return Math.max(da, db);
}
