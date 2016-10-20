/**
 * Talisman phonetics/onca
 * ========================
 *
 * The Oxford Name Compression Algorithm. This is basically a glorified
 * NYSIIS + Soundex combination.
 */
import soundex from './soundex';
import nysiis from './nysiis';

/**
 * Function taking a single name and computing its ONCA code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The ONCA code.
 */
export default function onca(name) {
  return soundex(nysiis(name));
}
