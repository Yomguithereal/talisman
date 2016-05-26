/* eslint no-confusing-arrow: 0 */
/**
 * Talisman phonetics/french/sonnex
 * =================================
 *
 * Implementation of the French phonetic algorithm "Sonnex".
 *
 * [Author]: Frédéric Bisson
 *
 * [Reference]:
 * https://github.com/Zigazou/Sonnex
 */
import {SIMPLE_QUOTES} from '../../regex/classes';

// TODO: test "empire" (only s after p is silent), "eschatologie", "schizophrénie"
// TODO: test la batterie restante d'homophones
// TODO: fix censé

/**
 * Helpers.
 */
const VOWELS = new Set('aâàäeéèêëiîïoôöuùûüyœ'),
      CONSONANTS = new Set('bcçdfghjklmnpqrstvwxyz');

const DROP_SIMPLE_QUOTES = new RegExp('[' + SIMPLE_QUOTES + ']', 'g');

function isVowel(letter) {
  return VOWELS.has(letter);
}

function isConsonant(letter) {
  return CONSONANTS.has(letter);
}

/**
 * Rules.
 */
const EXCEPTIONS = {
  cerf: 'sEr',
  cerfs: 'sEr',
  de: 'de',
  est: 'E',
  es: 'E',
  huit: 'uit',
  les: 'lE',
  mer: 'mEr',
  mes: 'mE',
  ressent: 'res2',
  serf: 'sEr',
  serfs: 'sEr',
  sept: 'sEt',
  septième: 'sEtiEm',
  ses: 'sE',
  tes: 'tE'
};

// Rules expressed in the following format:
//   [0]: The pattern to match (string if exact, regex if fuzzy)
//   [1]: The encoding. If passed as a function, the function must return
//        both the encoding and the continuation string.
//
// Note: it's possible to optimize the rules not to use regular expression
//       at all.
const RULES = {
  a: [
    ['a', 'a'],
    ['aient', 'E'],
    ['ain', '1'],
    [/ain(.)(.*)$/, (v, cs) => {
      if (isVowel(v))
        return ['E', v + cs];
      return ['1', v + cs];
    }],
    ['ais', 'E'],
    [/^ais(.)(.*)/, (v, cs) => {
      if (v === 's')
        return ['Es', cs];
      if (isVowel(v))
        return ['Ez', v + cs];
      return ['Es', v + cs];
    }],
    ['ail', 'ai'],
    [/^aill(.*)/, 'ai'],
    [/^ai(.*)/, 'E'],
    [/^amm(.*)/, 'am'],
    [/^am(.)(.*)/, (c, cs) => {
      if (c === 'm')
        return ['am', cs];
      if (isVowel(c))
        return ['am', c + cs];
      return ['2', c + cs];
    }],
    ['an', '2'],
    [/^an(.)(.*)/, (c, cs) => {
      if (c === 'n')
        return ['an', cs];
      if (isVowel(c))
        return ['an', c + cs];
      return ['2', c + cs];
    }],
    ['assent', 'as'],
    [/^as(.)(.*)/, (c, cs) => {
      if (c === 's')
        return ['as', cs];
      if (isConsonant(c))
        return ['as', c + cs];
      return ['az', c + cs];
    }],
    [/^au(.*)/, cs => {
      return ['o', cs];
    }],
    ['ay', 'E'],
    ['ays', 'E']
  ],

  à: [
    [/^à(.*)/, 'a']
  ],

  â: [
    [/^â(.*)/, 'a']
  ],

  b: [
    ['b', ''],
    [/^bb(.*)/, 'b']
  ],

  c: [
    ['c', ''],
    [/^c(a.*)/, 'k'],
    [/^cc(.)(.*)/, (v, cs) => {
      if (v === 'o' || v === 'u')
        return ['k', v + cs];
      return ['ks', cs];
    }],
    [/^c(e.*)/, 'se'],
    [/^c'(.*)/, 's'],
    [/^ch(ao.*)/, 'k'],
    [/^chl(.*)/, 'kl'],
    [/^ch(oe.*)/, 'k'],
    [/^chr(.*)/, 'kr'],
    [/^ch(.*)/, 'C'],
    [/^c(i.*)/, 's'],
    [/^ck(.*)/, 'k'],
    [/^c(oeu.*)/, 'k'],
    [/^compt(.*)/, 'k3t'],
    [/^c(o.*)/, 'k'],
    [/^cue(i.*)/, 'ke'],
    [/^c(u.*)/, 'k'],
    [/^c(y.*)/, 's'],
    [/^c(.*)/, 'k']
  ],

  ç: [
    [/^ç(.*)/, 's']
  ],

  d: [
    ['d', ''],
    ['ds', ''],
    [/^dd(.*)/, 'd']
  ],

  e: [
    ['e', ''],
    ['ec', 'Ec'],
    ['ef', 'Ef'],
    ['eaux', 'o'],
    [/^eann(.*)/, 'an'],
    [/^ean(.*)/, '2'],
    [/^eau(.*)/, 'o'],
    [/^eff(.*)/, 'Ef'],
    [/^e(gm.*)/, 'E'],
    ['ein', '1'],
    [/^ein(.)(.*)/, (c, cs) => {
      if (c === 'n')
        return ['En', cs];
      if (isVowel(c))
        return ['En', c + cs];
      return ['1', c + cs];
    }],
    [/^ei(.*)/, 'E'],
    [/^ell(.*)/, 'El'],
    [/^el(.)(.*)/, (c, cs) => {
      if (isConsonant(c))
        return ['E', 'l' + c + cs];
      return ['e', 'l' + c + cs];
    }],
    [/^emm(.*)/, 'Em'],
    [/^emp(.*)/, '2'],
    [/^enn(.*)/, 'En'],
    ['en', '2'],
    [/^en(.)(.*)/, (c, cs) => {
      if (isVowel(c))
        return ['en', c + cs];
      return ['2', c + cs];
    }],
    ['er', 'E'],
    ['ert', 'Er'],
    [/^err(.*)/, 'Er'],
    [/^er(f.*)/, 'Er'],
    ['es', ''],
    [/^esch(.*)/, 'EC'],
    ['essent', 'Es'],
    [/^es(.)(.*)/, (c, cs) => {
      if (c === 'h' || c === 'n')
        return ['E', c + cs];
      if (c === 's')
        return ['Es', cs];
      if (isConsonant(c))
        return ['Es', c + cs];
      return ['ez', c + cs];
    }],
    [/^és(.)(.*)/, (c, cs) => {
      if (c === 's')
        return ['Es', cs];
      if (isConsonant(c))
        return ['Es', c + cs];
      return ['Ez', c + cs];
    }],
    [/^ett(.*)/, 'Et'],
    ['et', 'E'],
    [/^et(.*)/, 'et'],
    [/^eun(.)(.*)/, (c, cs) => {
      if (isVowel(c))
        return ['en', c + cs];
      return ['1', c + cs];
    }],
    ['eux', 'e'],
    [/^eux(i.*)/, 'ez'],
    [/^eu(.*)/, 'e'],
    ['ex', 'Eks'],
    [/^ey(.)(.*)/, (c, cs) => {
      if (isConsonant(c))
        return ['E', c + cs];
      return ['E', 'y' + c + cs];
    }],
    ['ez', 'E']
  ],

  è: [
    [/^è(.*)/, 'E']
  ],

  ê: [
    [/ê(.*)/, 'E']
  ],

  ë: [
    [/^ë(l.*)/, 'E']
  ],

  é: [
    ['é', 'E'],
    [/^é(.)(.*)/, (c, cs) => {
      if (c === 't')
        return ['Et', cs];
      return ['E', c + cs];
    }]
  ],

  f: [
    [/^ff(.*)/, 'f']
  ],

  g: [
    ['g', ''],
    [/^g(e.*)/, 'j'],
    [/^gé(.*)/, 'jE'],
    [/^g(i.*)/, 'j'],
    [/^gn(.*)/, 'n'],
    [/^g(y.*)/, 'j'],
    [/^guë(.*)/, 'gu'],
    [/^gu(.*)/, 'g'],
    [/^gg(.*)/, 'g']
  ],

  h: [
    [/^h(.*)/, '']
  ],

  i: [
    ['ic', 'ik'],
    ['ics', 'ik'],
    [/^ienn(.*)/, 'iEn'],
    [/^ien(.*)/, 'i1'],
    ['in', '1'],
    [/^in(.)(.*)/, (c, cs) => {
      if (c === 'n')
        return ['in', cs];
      if (isVowel(c))
        return ['in', c + cs];
      return ['1', c + cs];
    }],
    ['issent', 'is'],
    [/^is(.)(.*)/, (c, cs) => {
      if (c === 's')
        return ['is', cs];
      if (isConsonant(c))
        return ['is', c + cs];
      return ['iz', c + cs];
    }],
    [/^ix(i.*)/, 'iz'],
    [/^ill(.*)/, 'i'],
    [/^i(.*)/, 'i']
  ],

  ï: [
    [/^ï(.*)/, 'i']
  ],

  l: [
    [/^ll(.*)/, 'l']
  ],

  m: [
    [/^mm(.*)/, 'm']
  ],

  n: [
    [/^nn(.*)/, 'n']
  ],

  o: [
    [/^occ(.*)/, 'ok'],
    [/^oeu?(.*)/, 'e'],
    ['oient', 'Ua'],
    [/^oin(.*)/, 'U1'],
    [/^oi(.*)/, 'Ua'],
    [/^omm(.*)/, 'om'],
    [/^om(.)(.*)/, (c, cs) => {
      if (isVowel(c))
        return ['om', c + cs];
      return ['3', c + cs];
    }],
    [/^onn(.*)/, 'on'],
    [/^on(.*)/, '3'],
    ['ossent', 'os'],
    [/^os(.)(.*)/, (c, cs) => {
      if (c === 's')
        return ['os', cs];
      if (isConsonant(c))
        return ['os', c + cs];
      return ['oz', c + cs];
    }],
    [/^o[uùû](.*)/, 'U']
  ],

  ô: [
    [/^ô(.*)/, 'o']
  ],

  ö: [
    [/^ô(.*)/, 'o']
  ],

  p: [
    ['p', ''],
    [/^ph(.*)/, 'f'],
    [/^pp(.*)/, 'p'],
    [/^pays(.*)/, cs => {
      return ['pE', 'is' + cs];
    }]
  ],

  q: [
    [/^qu(r.*)/, 'ku'],
    [/^qu(.*)/, 'k'],
    [/^q(.*)/, 'k']
  ],

  r: [
    [/^rr(.*)/, 'r']
  ],

  s: [
    ['s', ''],
    [/^ss(.*)/, 's'],
    [/^st(.*)/, 'st'],
    [/^sc(i.*)/, 's']
  ],

  t: [
    ['t', ''],
    [/^t(ier.*)/, 't'],
    [/^ti(.)(.*)/, (v, cs) => {
      if (isVowel(v))
        return ['s', 'i' + v + cs];
      return ['t', 'i' + v + cs];
    }],
    [/^tt(.*)/, 't']
  ],

  u: [
    ['un', '1'],
    [/^û(.*)/, 'u'],
    ['ussent', 'us'],
    [/^us(.*)/, (c, cs) => {
      if (c === 's')
        return ['us', cs];
      if (isConsonant(c))
        return ['us', c + cs];
      return ['uz', c + cs];
    }]
  ],

  w: [
    [/^w(.*)/, 'v']
  ],

  x: [
    ['x', ''],
    [/^x(.)(.*)/, (c, cs) => {
      if (c === 'c')
        return ['ks', cs];
      if (isVowel(c))
        return ['kz', c + cs];
      return ['ks', c + cs];
    }]
  ],

  y: [
    [/^y(.*)/, 'i']
  ],

  z: [
    [/^zz(.*)/, 'z']
  ]
};

/**
 * Function taking a single word and computing its Sonnex code.
 *
 * @param  {string}  word - The word to process.
 * @return {string}       - The Sonnex code.
 *
 * @throws {Error} The function expects the word to be a string.
 */
export default function sonnex(word) {
  if (typeof word !== 'string')
    throw Error('talisman/phonetics/french/sonnex: the given word is not a string.');

  word = word
    .toLowerCase()
    .replace(DROP_SIMPLE_QUOTES, '')
    .replace(/œ/g, 'oe');

  // Some exceptions
  const exception = EXCEPTIONS[word];

  if (exception)
    return exception;

  // Applying the rules
  let current = word,
      code = '';

  // If the word starts with "tien", we skip encoding the "t"
  if (/^tien/.test(current)) {
    current = current.slice(1);
    code = 't';
  }

  // Encoding each letter of the word
  while (current.length) {
    const firstLetter = current[0];

    // Retrieving the proper set of rules
    const rules = RULES[firstLetter];

    // If there is no rules for the letter, we skip to the next one
    if (!rules) {
      code += firstLetter;
      current = current.slice(1);
      continue;
    }

    let found = false;

    // Iterating through rules
    for (let i = 0, l = rules.length; i < l; i++) {
      const pattern = rules[i][0];
      let encoding = rules[i][1];

      // Simple pattern
      if (typeof pattern === 'string') {
        if (current === pattern) {
          found = true;
          code += encoding;
          current = '';
          break;
        }

        continue;
      }

      // Regex pattern
      const match = current.match(pattern);

      if (match) {
        found = true;

        if (typeof encoding === 'string') {
          current = match[1] || '';
        }

        else {
          [encoding, current] = encoding(...match.slice(1));
        }

        code += encoding;

        break;
      }
    }

    if (!found) {
      code += firstLetter;
      current = current.slice(1);
    }
  }

  return code;
}
