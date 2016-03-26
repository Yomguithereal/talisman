/**
 * Talisman stemmers/lancaster
 * ============================
 *
 * The Lancaster stemmer.
 */

/**
 * Rules of the stemmer.
 */
const INTACT = 'INTACT',
      CONTINUE = 'CONTINUE',
      STOP = 'STOP',
      PROTECT = 'PROTECT';

const RULES = {
  a: [['ia', '', INTACT], ['a', '', INTACT]],
  b: [['bb', 'b', STOP]],
  c: [['ytic', 'ys', STOP], ['ic', '', CONTINUE], ['nc', 'nt', CONTINUE]],
  d: [['dd', 'd', STOP], ['ied', 'y', CONTINUE], ['ceed', 'cess', STOP], ['eed', 'ee', STOP], ['ed', '', CONTINUE], ['hood', '', CONTINUE]],
  e: [['e', '', CONTINUE]],
  f: [['lief', 'liev', STOP], ['if', '', CONTINUE]],
  g: [['ing', '', CONTINUE], ['iag', 'y', STOP], ['ag', '', CONTINUE], ['gg', 'g', STOP]],
  h: [['th', '', INTACT], ['guish', 'ct', STOP], ['ish', '', CONTINUE]],
  i: [['i', '', INTACT], ['i', 'y', CONTINUE]],
  j: [['ij', 'id', STOP], ['fuj', 'fus', STOP], ['uj', 'ud', STOP], ['oj', 'od', STOP], ['hej', 'her', STOP], ['verj', 'vert', STOP], ['misj', 'mit', STOP], ['nj', 'nd', STOP], ['j', 's', STOP]],
  l: [['ifiabl', '', STOP], ['iabl', 'y', STOP], ['abl', '', CONTINUE], ['ibl', '', STOP], ['bil', 'bl', CONTINUE], ['cl', 'c', STOP], ['iful', 'y', STOP], ['ful', '', CONTINUE], ['ul', '', STOP], ['ial', '', CONTINUE], ['ual', '', CONTINUE], ['al', '', CONTINUE], ['ll', 'l', STOP]],
  m: [['ium', '', STOP], ['um', '', INTACT], ['ism', '', CONTINUE], ['mm', 'm', STOP]],
  n: [['sion', 'j', CONTINUE], ['xion', 'ct', STOP], ['ion', '', CONTINUE], ['ian', '', CONTINUE], ['an', '', CONTINUE], ['een', '', PROTECT], ['en', '', CONTINUE], ['nn', 'n', STOP]],
  p: [['ship', '', CONTINUE], ['pp', 'p', STOP]],
  r: [['er', '', CONTINUE], ['ear', '', PROTECT], ['ar', '', STOP], ['ior', '', CONTINUE], ['or', '', CONTINUE], ['ur', '', CONTINUE], ['rr', 'r', STOP], ['tr', 't', CONTINUE], ['ier', 'y', CONTINUE]],
  s: [['ies', 'y', CONTINUE], ['sis', 's', STOP], ['is', '', CONTINUE], ['ness', '', CONTINUE], ['ss', '', PROTECT], ['ous', '', CONTINUE], ['us', '', INTACT], ['s', '', CONTINUE], ['s', '', STOP]],
  t: [['plicat', 'ply', STOP], ['at', '', CONTINUE], ['ment', '', CONTINUE], ['ent', '', CONTINUE], ['ant', '', CONTINUE], ['ript', 'rib', STOP], ['orpt', 'orb', STOP], ['duct', 'duc', STOP], ['sumpt', 'sum', STOP], ['cept', 'ceiv', STOP], ['olut', 'olv', STOP], ['sist', '', PROTECT], ['ist', '', CONTINUE], ['tt', 't', STOP]],
  u: [['iqu', '', STOP], ['ogu', 'og', STOP]],
  v: [['siv', 'j', CONTINUE], ['eiv', '', PROTECT], ['iv', '', CONTINUE]],
  y: [['bly', 'bl', CONTINUE], ['ily', 'y', CONTINUE], ['ply', '', PROTECT], ['ly', '', CONTINUE], ['ogy', 'og', STOP], ['phy', 'ph', STOP], ['omy', 'om', STOP], ['opy', 'op', STOP], ['ity', '', CONTINUE], ['ety', '', CONTINUE], ['lty', 'l', STOP], ['istry', '', STOP], ['ary', '', CONTINUE], ['ory', '', CONTINUE], ['ify', '', STOP], ['ncy', 'nt', CONTINUE], ['acy', '', CONTINUE]],
  z: [['iz', '', CONTINUE], ['yz', 'ys', STOP]]
};

/**
 * Patterns.
 */
const VOWEL = /[aeiouy]/;

/**
 * Helpers.
 */
function isStemAcceptable(stem) {
  if (VOWEL.test(stem.charAt(0)))
    return stem.length > 1;
  return stem.length > 2 && VOWEL.test(stem);
}

/**
 * Function stemming the given world using the Lancaster algorithm.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function lancaster(word) {
  let stem = word.toLowerCase(),
      intact = true;

  let rules = RULES[stem.charAt(stem.length - 1)];

  if (!rules)
    return stem;

  let i = -1, l = rules.length;

  while (++i < l) {
    const [match, replacement, kind] = rules[i];

    if (!intact && kind === INTACT)
      continue;

    const breakpoint = stem.length - match.length;

    if (breakpoint < 0 || stem.substr(breakpoint) !== match)
      continue;

    if (kind === PROTECT)
      return stem;

    const next = stem.substr(0, breakpoint) + replacement;

    if (!isStemAcceptable(next))
      continue;

    stem = next;

    if (kind === CONTINUE) {
      intact = false;
      rules = RULES[stem.charAt(stem.length - 1)];

      if (!rules)
        return stem;

      i = -1;
      l = rules.length;
    }
  }

  return stem;
}
