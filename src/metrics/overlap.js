/**
 * Talisman metrics/overlap
 * =========================
 *
 * Function computing the overlap coefficient.
 */
import {intersection} from 'set-functions';
import {seq} from '../helpers';

/**
 * Function returning the overlap coefficient between two sequences.
 *
 * @param  {mixed}  a     - The first sequence.
 * @param  {mixed}  b     - The second sequence.
 * @return {number}       - The overlap coefficient between a & b.
 */
export default function overlap(a, b) {

  if (a === b)
    return 1;

  a = new Set(seq(a));
  b = new Set(seq(b));

  const i = intersection(a, b);

  return i.size / Math.min(a.size, b.size);
}
