/**
 * Talisman stemmers/french/porter
 * ================================
 *
 * The Porter stemmer for the French language
 */

/**
 * Constants.
 */
const VOWELS = new Set('aeiouyâàëéêèïîôûù');

const STEP1_SUFFIXES = [
  'issements', 'issement', 'atrices', 'atrice',
  'ateurs', 'ations', 'logies', 'usions',
  'utions', 'ements', 'amment', 'emment',
  'ances', 'iqUes', 'ismes', 'ables', 'istes',
  'ateur', 'ation', 'logie', 'usion', 'ution',
  'ences', 'ement', 'euses', 'ments', 'ance',
  'iqUe', 'isme', 'able', 'iste', 'ence',
  'ités', 'ives', 'eaux', 'euse', 'ment',
  'eux', 'ité', 'ive', 'ifs', 'aux', 'if'
];

const STEP1_SET1 = new Set([
  'ance', 'iqUe', 'isme', 'able', 'iste',
  'eux', 'ances', 'iqUes', 'ismes',
  'ables', 'istes'
]);

const STEP1_SET2 = new Set([
  'atrice', 'ateur', 'ation', 'atrices',
  'ateurs', 'ations'
]);

const STEP1_SET3 = new Set(['usion', 'ution', 'usions', 'utions']);

const STEP1_SET4 = new Set(['if', 'ive', 'ifs', 'ives']);

const STEP2A_SUFFIXES = [
  'issaIent', 'issantes', 'iraIent', 'issante',
  'issants', 'issions', 'irions', 'issais',
  'issait', 'issant', 'issent', 'issiez', 'issons',
  'irais', 'irait', 'irent', 'iriez', 'irons',
  'iront', 'isses', 'issez', 'îmes',
  'îtes', 'irai', 'iras', 'irez', 'isse',
  'ies', 'ira', 'ît', 'ie', 'ir', 'is',
  'it', 'i'
];

const STEP2B_SUFFIXES = [
  'eraIent', 'assions', 'erions', 'assent',
  'assiez', 'èrent', 'erais', 'erait',
  'eriez', 'erons', 'eront', 'aIent', 'antes',
  'asses', 'ions', 'erai', 'eras', 'erez',
  'âmes', 'âtes', 'ante', 'ants',
  'asse', 'ées', 'era', 'iez', 'ais',
  'ait', 'ant', 'ée', 'és', 'er',
  'ez', 'ât', 'ai', 'as', 'é', 'a'
];

const STEP4_SUFFIXES = [
  'ière', 'Ière', 'ion', 'ier', 'Ier',
  'e', 'ë'
];

/**
 * Helpers.
 */
function findR1R2(word) {
  let r1 = '',
      r2 = '';

  for (let i = 0, l = word.length; i < l; i++) {
    if (!VOWELS.has(word[i]) && VOWELS.has(word[i - 1])) {
      r1 = word.slice(i + 1);
      break;
    }
  }

  for (let i = 0, l = r1.length; i < l; i++) {
    if (!VOWELS.has(r1[i]) && VOWELS.has(r1[i - 1])) {
      r2 = r1.slice(i + 1);
      break;
    }
  }

  return [r1, r2];
}

function findRV(word) {
  let rv = '';

  if (word.length >= 2) {
    if (/^(?:par|col|tap)/.test(word) ||
        (VOWELS.has(word[0]) && VOWELS.has(word[1]))) {
      rv = word.slice(3);
    }
    else {
      for (let i = 1, l = word.length; i < l; i++) {
        if (VOWELS.has(word[i])) {
          rv = word.slice(i + 1);
          break;
        }
      }
    }
  }

  return rv;
}

function suffixStem(stem, oldSuffix, newSuffix) {
  const length = typeof oldSuffix === 'number' ?
    oldSuffix :
    oldSuffix.length;

  return stem.slice(0, -length) + newSuffix;
}

/**
 * Function stemming the given world using the Porter algorithm for the French
 * language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function(word) {
  word = word.toLowerCase();

  // State
  let step1Success = false,
      rvEndingFound = false,
      step2aSuccess = false,
      step2bSuccess = false;

  // Every letter "u" after the letter "q" is put into upper case
  word = word.replace(/qu/g, 'qU');

  // Every "u" or "i" between vowels is put into upper case
  // Every "y" followed or preceded by a vowel is put into upper case
  const previousWord = word;
  word = '';
  for (let i = 0, l = previousWord.length; i < l; i++) {
    const letter = previousWord[i],
          previousLetter = previousWord[i - 1],
          nextLetter = previousWord[i + 1];

    if ((letter === 'u' ||
         letter === 'i') &&
        VOWELS.has(previousLetter) &&
        VOWELS.has(nextLetter)) {
      word += letter.toUpperCase();
    }

    else if (letter === 'y' &&
             (VOWELS.has(previousLetter) ||
              VOWELS.has(nextLetter))) {
      word += 'Y';
    }

    else {
      word += letter;
    }
  }

  let [r1, r2] = findR1R2(word),
      rv = findRV(word),
      stem = word;

  //-- Step n°1
  for (let i = 0, l = STEP1_SUFFIXES.length; i < l; i++) {
    const suffix = STEP1_SUFFIXES[i],
          suffixInR2 = r2.includes(suffix);

    if (stem.endsWith(suffix)) {

      if (suffix === 'eaux') {
        stem = stem.slice(0, -1);
        step1Success = true;
      }

      else if (suffix === 'euse' || suffix === 'euses') {
        if (suffixInR2) {
          stem = stem.slice(0, -suffix.length);
          step1Success = true;
        }
        else if (r1.includes(suffix)) {
          stem = suffixStem(stem, suffix, 'eux');
          step1Success = true;
        }
      }

      else if ((suffix === 'ement' || suffix === 'ements') &&
               rv.includes(suffix)) {
        stem = stem.slice(0, -suffix.length);
        step1Success = true;

        const lastThreeLetters = stem.slice(-3);

        if (stem.slice(-2) === 'iv' && r2.includes('iv')) {
          stem = stem.slice(0, -2);

          if (stem.slice(-2) === 'at' && r2.includes('at'))
            stem = stem.slice(0, -2);
        }

        else if (stem.slice(-3) === 'eus') {
          if (r2.includes('eus'))
            stem = stem.slice(0, -3);
          else if (r1.includes('eus'))
            stem = suffixStem(stem, 1, 'x');
        }

        else if (lastThreeLetters === 'abl' || lastThreeLetters === 'iqU') {
          if (r2.includes('abl') || r2.includes('iqU'))
            stem = stem.slice(0, -3);
        }

        else if (lastThreeLetters === 'ièr' || lastThreeLetters === 'Ièr') {
          if (rv.includes('ièr') || rv.includes('Ièr'))
            stem = suffixStem(stem, 3, 'i');
        }
      }

      else if (suffix === 'amment' && rv.includes(suffix)) {
        stem = suffixStem(stem, 'amment', 'ant');
        rv = suffixStem(rv, 'amment', 'ant');
        rvEndingFound = true;
      }

      else if (suffix === 'emment' && rv.includes(suffix)) {
        stem = suffixStem(stem, 'emment', 'ent');
        rvEndingFound = true;
      }

      else if ((suffix === 'ment' || suffix === 'ments') &&
               rv.includes(suffix) &&
               !rv.startsWith(suffix) &&
               VOWELS.has(rv.indexOf(suffix) - 1)) {
        stem = stem.slice(0, -suffix.length);
        rv = rv.slice(0, -suffix.length);
        rvEndingFound = true;
      }

      else if (suffix === 'aux' && r1.includes(suffix)) {
        stem = suffixStem(stem, 2, 'l');
        step1Success = true;
      }

      else if ((suffix === 'issement' || suffix === 'issements') &&
               r1.includes(suffix) &&
               !VOWELS.has(stem[-suffix.length - 1])) {
        stem = stem.slice(0, suffix.length);
        step1Success = true;
      }

      else if (STEP1_SET1.has(suffix) && suffixInR2) {
        stem = stem.slice(0, -suffix.length);
        step1Success = true;
      }

      else if (STEP1_SET2.has(suffix) && suffixInR2) {
        stem = stem.slice(0, -suffix.length);
        step1Success = true;

        if (stem.slice(-2) === 'ic') {
          if (r2.includes(r2))
            stem = stem.slice(0, -2);
          else
            stem = suffixStem(stem, 2, 'iqU');
        }
      }

      else if ((suffix === 'logie' || suffix === 'logies') && suffixInR2) {
        stem = suffixStem(stem, suffix, 'log');
        step1Success = true;
      }

      else if (STEP1_SET3.has(suffix) && suffixInR2) {
        stem = suffixStem(stem, suffix, 'u');
        step1Success = true;
      }

      else if ((suffix === 'ence' || suffix === 'ences') && suffixInR2) {
        stem = suffixStem(stem, suffix, 'ent');
        step1Success = true;
      }

      else if ((suffix === 'ité' || suffix === 'ités') && suffixInR2) {
        stem = stem.slice(0, -suffix.length);
        step1Success = true;

        if (stem.slice(-4) === 'abil') {
          if (r2.includes('abil'))
            stem = stem.slice(0, -4);
          else
            stem = suffixStem(stem, 2, 'l');
        }

        else if (stem.slice(-2) === 'ic') {
          if (r2.includes('ic'))
            stem = stem.slice(0, -2);
          else
            stem = suffixStem(stem, 2, 'iqU');
        }

        else if (stem.slice(-2) === 'iv') {
          if (r2.includes('iv'))
            stem = stem.slice(0, -2);
        }
      }

      else if (STEP1_SET4.has(suffix) && suffixInR2) {
        stem = stem.slice(0, -suffix.length);
        step1Success = true;

        if (stem.slice(-2) === 'at' && r2.includes('at')) {
          stem = stem.slice(0, -2);

          if (stem.slice(-2) === 'ic') {
            if (r2.includes('ic'))
              stem = stem.slice(0, -2);
            else
              stem = suffixStem(stem, 2, 'iqU');
          }
        }
      }

      break;
    }
  }
}
