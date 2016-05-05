/**
 * Talisman stemmers/french/porter
 * ================================
 *
 * The Porter stemmer for the French language.
 *
 * [Reference]:
 * http://snowball.tartarus.org/algorithms/french/stemmer.html
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

const STEP2B_SET1 = new Set([
  'eraIent', 'erions', 'èrent',
  'erais', 'erait', 'eriez',
  'erons', 'eront', 'erai', 'eras',
  'erez', 'ées', 'era', 'iez',
  'ée', 'és', 'er', 'ez',
  'é'
]);

const STEP2B_SET2 = new Set([
  'assions', 'assent', 'assiez',
  'aIent', 'antes', 'asses',
  'âmes', 'âtes', 'ante',
  'ants', 'asse', 'ais', 'ait',
  'ant', 'ât', 'ai', 'as',
  'a'
]);

const STEP4_SUFFIXES = [
  'ière', 'Ière', 'ion', 'ier', 'Ier',
  'e', 'ë'
];

const STEP4_SET1 = new Set('aiouès'),
      STEP4_SET2 = new Set(['ier', 'ière', 'Ier', 'Ière']);

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

function replaceLetter(stem, index, replacement) {
  return stem.substring(0, index) + replacement + stem.slice(index + 1);
}

function suffixStem(stem, oldSuffix, newSuffix = '') {
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
  for (let i = 1, l = word.length - 1; i < l; i++) {
    const letter = word[i],
          previousLetter = word[i - 1],
          nextLetter = word[i + 1];

    if ((letter === 'u' ||
         letter === 'i') &&
        VOWELS.has(previousLetter) &&
        VOWELS.has(nextLetter)) {
      word = replaceLetter(word, i, letter.toUpperCase());
    }

    else if (letter === 'y' &&
             (VOWELS.has(previousLetter) ||
              VOWELS.has(nextLetter))) {
      word = replaceLetter(word, i, 'Y');
    }
  }

  const [r1, r2] = findR1R2(word);

  let rv = findRV(word),
      stem = word;

  //-- Step 1
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
               VOWELS.has(rv[rv.lastIndexOf(suffix) - 1])) {
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
               !VOWELS.has(stem.slice(-suffix.length - 1)[0])) {
        stem = stem.slice(0, -suffix.length);
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
          if (r2.includes('ic'))
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

  //-- Step 2a
  if (!step1Success || rvEndingFound) {
    for (let i = 0, l = STEP2A_SUFFIXES.length; i < l; i++) {
      const suffix = STEP2A_SUFFIXES[i];

      if (stem.endsWith(suffix)) {
        if (rv.includes(suffix) &&
            rv.length > suffix.length &&
            !VOWELS.has(rv[rv.lastIndexOf(suffix) - 1])) {
          stem = stem.slice(0, -suffix.length);
          step2aSuccess = true;
        }

        break;
      }
    }

    //-- Step 2b
    if (!step2aSuccess) {
      for (let i = 0, l = STEP2B_SUFFIXES.length; i < l; i++) {
        const suffix = STEP2B_SUFFIXES[i];

        if (rv.endsWith(suffix)) {

          if (suffix === 'ions' && r2.includes('ions')) {
            stem = stem.slice(0, -4);
            step2bSuccess = true;
          }

          else if (STEP2B_SET1.has(suffix)) {
            stem = stem.slice(0, -suffix.length);
            step2bSuccess = true;
          }

          else if (STEP2B_SET2.has(suffix)) {
            stem = stem.slice(0, -suffix.length);
            rv = rv.slice(0, -suffix.length);
            step2bSuccess = true;

            if (rv.endsWith('e'))
              stem = stem.slice(0, -1);
          }

          break;
        }
      }
    }
  }

  const lastLetter = stem[stem.length - 1];

  //-- Step 3
  if (step1Success || step2aSuccess || step2bSuccess) {

    if (lastLetter === 'Y')
      stem = suffixStem(stem, 1, 'i');
    else if (lastLetter === 'ç')
      stem = suffixStem(stem, 1, 'c');
  }

  //-- Step 4
  else {
    if (stem.length >= 2 &&
        lastLetter === 's' &&
        !STEP4_SET1.has(stem[stem.length - 2])) {
      stem = stem.slice(0, -1);
    }

    for (let i = 0, l = STEP4_SUFFIXES.length; i < l; i++) {
      const suffix = STEP4_SUFFIXES[i];

      if (stem.endsWith(suffix) && rv.includes(suffix)) {
        if (suffix === 'ion' &&
            r2.includes(suffix) &&
            'st'.includes(rv[rv.length - 4])) {
          stem = stem.slice(0, -3);
        }

        else if (STEP4_SET2.has(suffix)) {
          stem = suffixStem(stem, suffix, 'i');
        }

        else if (suffix === 'e')
          stem = stem.slice(0, -1);

        else if (suffix === 'ë' && stem.slice(-3, -1) === 'gu')
          stem = stem.slice(0, -1);

        break;
      }
    }
  }

  //-- Step 5
  if (/(?:enn|onn|ett|ell|eill)$/.test(stem))
    stem = stem.slice(0, -1);

  //-- Step 6
  stem = stem.replace(/[éè]([^aeiouyâàëéêèïîôûù]+)$/, 'e$1');

  return stem.toLowerCase();
}
