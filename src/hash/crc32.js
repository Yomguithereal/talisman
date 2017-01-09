/**
 * Talisman hash/crc32
 * ====================
 *
 * JavaScript implementation of the CRC32 hash for UTF-8 strings.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Cyclic_redundancy_check
 */

/**
 * Constants.
 */
const TABLE = new Int32Array(256);

for (let c = 0, n = 0; n !== 256; n++) {
  c = n;
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
  TABLE[n] = c;
}

/**
 * Computes the CRC32 hash for the given UTF-8 string.
 *
 * @param  {string} string - The string to hash.
 * @return {number}        - The signed CRC32 hash.
 */
export default function crc32(string) {
  let C = -1;

  for (let i = 0, l = string.length, c, d; i < l;) {
    c = string.charCodeAt(i++);

    if (c < 0x80) {
      C = (C >>> 8) ^ TABLE[(C ^ c) & 0xFF];
    }
    else if (c < 0x800) {
      C = (C >>> 8) ^ TABLE[(C ^ (192 | ((c >> 6) & 31))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | (c & 63))) & 0xFF];
    }
    else if (c >= 0xD800 && c < 0xE000) {
      c = (c & 1023) + 64;
      d = string.charCodeAt(i++) & 1023;
      C = (C >>> 8) ^ TABLE[(C ^ (240 | ((c >> 8) & 7))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | ((c >> 2) & 63))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | (d & 63))) & 0xFF];
    }
    else {
      C = (C >>> 8) ^ TABLE[(C ^ (224 | ((c >> 12) & 15))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | ((c >> 6) & 63))) & 0xFF];
      C = (C >>> 8) ^ TABLE[(C ^ (128 | (c & 63))) & 0xFF];
    }
  }

  return C ^ -1;
}
