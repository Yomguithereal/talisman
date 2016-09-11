/**
 * Talisman structure/bloom-filter
 * ================================
 *
 * Bloom filter implementation using the Fowler-Noll-Vo hash function.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Bloom_filter
 * https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function
 * http://www.isthe.com/chongo/tech/comp/fnv/
 * http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
 * https://www.jasondavies.com/bloomfilter/
 *
 * [Article]:
 * Bloom, Burton H. (1970), "Space/Time Trade-offs in Hash Coding with Allowable
 * Errors", Communications of the ACM, 13 (7): 422–426
 *
 * [Note]:
 * This implementation uses some tricks to avoid multiple hashes.
 */

/**
 * Fowler-Noll-Vo Hash.
 */
function fnvMuliply(v) {
  return (
    v +
    (v << 1) +
    (v << 4) +
    (v << 7) +
    (v << 8) +
    (v << 24)
  );
}

function fnvMix(a) {
  a += a << 13;
  a ^= a >>> 7;
  a += a << 3;
  a ^= a >>> 17;
  a += a << 5;
  return a & 0xffffffff;
}

function fnvHash(string) {
  let a = 2166136261;

  for (let i = 0, l = string.length; i < l; i++) {
    const char = string.charCodeAt(i),
          d = char & 0xff00;

    if (d)
      a = fnvMuliply(a ^ d >> 8);

    a = fnvMuliply(a ^ char & 0xff);
  }

  return fnvMix(a);
}

function fnvHashFrom(hash) {
  return fnvMix(fnvMuliply(hash));
}

/**
 * Defaults.
 */
const DEFAULTS = {
  k: 3
};

function locations(k, m, r, string) {
  const a = fnvHash(string),
        b = fnvHashFrom(a);

  let x = a % m;

  for (let i = 0; i < k; i++) {
    r[i] = x < 0 ? (x + m) : x;
    x = (x + b) % m;
  }

  return r;
}

// TODO: clean up defaults & add way to add initial values

/**
 * Bloom filter class.
 *
 * @constructor
 * @param {number} size - Capacity of the Bloom filter.
 * @param {number} k    - Number of times to run the hash function.
 */
export default class BloomFilter {
  constructor(capacity, k) {

    if (typeof capacity !== 'number' || capacity <= 0)
      throw new Error('talisman/structures/bloom-filter.constructor: invalid capacity. Expecting a positive integer.');

    if (arguments.length > 1 && (typeof k !== 'number' || k <= 0))
      throw new Error('talisman/structures/bloom-filter.constructor: invalid k. Expecting a positive integer.');

    // Properties
    this.m = capacity * 32;
    this.k = k || DEFAULTS.k;
    this.capacity = capacity;
    this.size = 0;

    const kBytes = 1 << Math.ceil(
      Math.log(Math.ceil(Math.log(this.m) / Math.LN2 / 8)) / Math.LN2
    );

    let ByteArray;

    if (kBytes === 1)
      ByteArray = Uint8Array;
    else if (kBytes === 2)
      ByteArray = Uint16Array;
    else
      ByteArray = Uint32Array;

    const buffer = new ArrayBuffer(kBytes * this.k),
          buckets = new Int32Array(capacity);

    this.buckets = buckets;
    this.locations = new ByteArray(buffer);
  }

  /**
   * Method used to add an element to the set.
   *
   * @param  {mixed} element - Element to add (will be coerced to string).
   * @return {BloomFilter}
   */
  add(element) {

    // Throwing if already at full capacity
    if (this.size === this.capacity)
      throw new Error('talisman/structures/bloom-filter.add: this Bloom filter is full. Try adjusting its capacity at instantiation.');

    // String coercion
    element = '' + element;

    const r = locations(this.k, this.m, this.locations, element);

    for (let i = 0; i < this.k; i++) {
      this.buckets[(r[i] / 32) | 0] |= 1 << (r[i] % 32);
    }

    // Incrementing size
    this.size++;

    return this;
  }

  /**
   * Method used to test the existence of the given element. Will return
   * `false` if the element is definitely not in the set & `true` if the
   * element is maybe in the set.
   *
   * @param  {mixed} element - Element to test (will be coerced to string).
   * @return {boolean}
   */
  test(element) {

    // String coercion
    element = '' + element;

    const r = locations(this.k, this.m, this.locations, element);

    for (let i = 0; i < this.k; i++) {
      const b = r[i];

      if (!(this.buckets[(b / 32) | 0] & (1 << (b % 32))))
        return false;
    }

    return true;
  }
}
