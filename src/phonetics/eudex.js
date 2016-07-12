/* eslint no-confusing-arrow: 0 */
/**
 * Talisman phonetics/eudex
 * =========================
 *
 * JavaScript implementation of the Eudex phonetic hashing algorithm.
 *
 * [Reference]:
 * https://github.com/ticki/eudex
 *
 * [Author]:
 * @ticki (https://github.com/ticki)
 */
import Long from 'long';

/**
 * Maps.
 */
const binary = str => typeof str === 'string' ? parseInt(str, 2) : str,
      charCode = char => char.charCodeAt(0),
      charArray = str => str.split('').map(charCode);

const PHONES = [
  '0', // a
// +--------- Confident
// |+-------- Labial
// ||+------- Liquid
// |||+------ Dental
// ||||+----- Plosive
// |||||+---- Fricative
// ||||||+--- Nasal
// |||||||+-- Discriminant
// ||||||||
  '01001000', // b
  '00001100', // c
  '00011000', // d
  '0', // e
  '01000100', // f
  '00001000', // g
  '00000100', // h
  '1', // i
  '00000101', // j
  '00001001', // k
  '10100000', // l
  '00000010', // m
  '00010010', // n
  '0', // o
  '01001001', // p
  '10101000', // q
  '10100001', // r
  '00010100', // s
  '00011101', // t
  '1', // u
  '01000101', // v
  '00000000', // w
  '10000100', // x
  '1', // y
  '10010100', // z
].map(binary);

const LETTERS = PHONES.length;

const PHONES_C1 = [
  PHONES[charCode('s') - charCode('a')] ^ 1, // ß
  '0', // à
  '0', // á
  '0', // â
  '0', // ã
  '0', // ä [æ]
  '1', // å [oː]
  '0', // æ [æ]
  PHONES[charCode('z') - charCode('a')] ^ 1, // ç [t͡ʃ]
  '1', // è
  '1', // é
  '1', // ê
  '1', // ë
  '1', // ì
  '1', // í
  '1', // î
  '1', // ï
  '00010101', // ð [ð̠] (represented as a non-plosive T)
  '00010111', // ñ [nj] (represented as a combination of n and j)
  '0', // ò
  '0', // ó
  '0', // ô
  '0', // õ
  '1', // ö [ø]
  '1', // ÷
  '1', // ø [ø]
  '1', // ù
  '1', // ú
  '1', // û
  '1', // ü
  '1', // ý
  '00010101', // þ [ð̠] (represented as a non-plosive T)
  '1', // ÿ
].map(binary);

const INJECTIVE_PHONES = [
// +--------- Vowel
// |+-------- Closer than ɜ
// ||+------- Close
// |||+------ Front
// ||||+----- Close-mid
// |||||+---- Central
// ||||||+--- Open-mid
// |||||||+-- Discriminant
// ||||||||   (*=vowel)
  '10000100', // a*
  '00100100', // b
  '00000110', // c
  '00001100', // d
  '11011000', // e*
  '00100010', // f
  '00000100', // g
  '00000010', // h
  '11111000', // i*
  '00000011', // j
  '00000101', // k
  '01010000', // l
  '00000001', // m
  '00001001', // n
  '10010100', // o*
  '00100101', // p
  '01010100', // q
  '01010001', // r
  '00001010', // s
  '00001110', // t
  '11100000', // u*
  '00100011', // v
  '00000000', // w
  '01000010', // x
  '11100100', // y*
  '01001010', // z
].map(binary);

const INJECTIVE_PHONES_C1 = [
  INJECTIVE_PHONES[charCode('s') - charCode('a')] ^ 1, // ß
  INJECTIVE_PHONES[charCode('a') - charCode('a')] ^ 1, // à
  INJECTIVE_PHONES[charCode('a') - charCode('a')] ^ 1, // á
// +--------- Vowel
// |+-------- Closer than ɜ
// ||+------- Close
// |||+------ Front
// ||||+----- Close-mid
// |||||+---- Central
// ||||||+--- Open-mid
// |||||||+-- Discriminant
// ||||||||
  '10000000', // â
  '10000110', // ã
  '10100110', // ä [æ]
  '11000010', // å [oː]
  '10100111', // æ [æ]
  '01010100', // ç [t͡ʃ]
  INJECTIVE_PHONES[charCode('e') - charCode('a')] ^ 1, // è
  INJECTIVE_PHONES[charCode('e') - charCode('a')] ^ 1, // é
  INJECTIVE_PHONES[charCode('e') - charCode('a')] ^ 1, // ê
  '11000110', // ë [ə] or [œ]
  INJECTIVE_PHONES[charCode('i') - charCode('a')] ^ 1, // ì
  INJECTIVE_PHONES[charCode('i') - charCode('a')] ^ 1, // í
  INJECTIVE_PHONES[charCode('i') - charCode('a')] ^ 1, // î
  INJECTIVE_PHONES[charCode('i') - charCode('a')] ^ 1, // ï
  '00001011', // ð [ð̠] (represented as a non-plosive T)
  '00001011', // ñ [nj] (represented as a combination of n and j)
  INJECTIVE_PHONES[charCode('o') - charCode('a')] ^ 1, // ò
  INJECTIVE_PHONES[charCode('o') - charCode('a')] ^ 1, // ó
  INJECTIVE_PHONES[charCode('o') - charCode('a')] ^ 1, // ô
  INJECTIVE_PHONES[charCode('o') - charCode('a')] ^ 1, // õ
  '11011100', // ö [œ] or [ø]
  '1', // ÷
  '11011101', // ø [œ] or [ø]
  INJECTIVE_PHONES[charCode('u') - charCode('a')] ^ 1, // ù
  INJECTIVE_PHONES[charCode('u') - charCode('a')] ^ 1, // ú
  INJECTIVE_PHONES[charCode('u') - charCode('a')] ^ 1, // û
  INJECTIVE_PHONES[charCode('y') - charCode('a')] ^ 1, // ü
  INJECTIVE_PHONES[charCode('y') - charCode('a')] ^ 1, // ý
  '00001011', // þ [ð̠] (represented as a non-plosive T)
  INJECTIVE_PHONES[charCode('y') - charCode('a')] ^ 1, // ÿ
].map(binary);

/**
 * Function taking a single word and computing its Eudex hash.
 *
 * @param  {string} word - The word to process.
 * @return {number}      - The Eudex hash.
 */
const A = charCode('a'),
      Z = charCode('z');

export default function eudex(word) {
  const array = charArray(word);

  let entry = array.length > 0 ?
    ((array[0] | 32) - A) & 0xFF :
    0;

  let firstByte = 0;

  if (entry < LETTERS)
    firstByte = INJECTIVE_PHONES[entry];
  else if (entry >= 0xDF && entry < 0xFF)
    firstByte = INJECTIVE_PHONES_C1[entry - 0xDF];

  firstByte = new Long(firstByte);

  let res = Long.UZERO,
      n = 0,
      b = 1;

  while (n < 8 && b < array.length) {
    entry = ((array[b] | 32) - A) & 0xFF;

    if (entry <= Z) {
      let x;

      if (entry < LETTERS)
        x = PHONES[entry];
      else if (entry >= 0xDF && entry < 0xFF)
        x = PHONES_C1[entry - 0xDF];
      else
        continue;

      if (!res.and(0xFE).equals(x & 0xFE)) {
        res = res.shiftLeft(8);
        res = res.or(x);
        n++;
      }
    }

    b++;
  }

  return res.or(firstByte.shiftLeft(56));
}
