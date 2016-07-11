import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import alphaSis from 'talisman/phonetics/alpha-sis';
import caverphone, {revisited} from 'talisman/phonetics/caverphone';
import daitchMokotoff from 'talisman/phonetics/daitch-mokotoff';
import doubleMetaphone from 'talisman/phonetics/double-metaphone';
import fuzzySoundex from 'talisman/phonetics/fuzzy-soundex';
import lein from 'talisman/phonetics/lein';
import metaphone from 'talisman/phonetics/metaphone';
import mra from 'talisman/phonetics/mra';
import nysiis, {refined} from 'talisman/phonetics/nysiis';
import phonex from 'talisman/phonetics/phonex';
import rogerRoot from 'talisman/phonetics/roger-root';
import soundex, {refined as refinedSoundex} from 'talisman/phonetics/soundex';
import statcan from 'talisman/phonetics/statcan';

const multiRenderer = code => `[${code.join(', ')}]`,
      multiComparator = (a, b) => {
        const bSet = new Set(b);

        return a.some(code => bSet.has(code));
      };

render(<PhoneticTester algorithm={alphaSis} codeRenderer={multiRenderer} comparator={multiComparator} />, document.getElementById('alpha-sis-mount'));
render(<PhoneticTester algorithm={caverphone} />, document.getElementById('caverphone-original-mount'));
render(<PhoneticTester algorithm={revisited} />, document.getElementById('caverphone-revisited-mount'));
render(<PhoneticTester algorithm={daitchMokotoff} codeRenderer={multiRenderer} comparator={multiComparator} />, document.getElementById('daitch-mokotoff-mount'));
render(<PhoneticTester algorithm={doubleMetaphone} codeRenderer={multiRenderer} comparator={multiComparator} />, document.getElementById('double-metaphone-mount'));
render(<PhoneticTester algorithm={fuzzySoundex} />, document.getElementById('fuzzy-soundex-mount'));
render(<PhoneticTester algorithm={lein} />, document.getElementById('lein-mount'));
render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
render(<PhoneticTester algorithm={mra} />, document.getElementById('mra-mount'));
render(<PhoneticTester algorithm={nysiis} />, document.getElementById('nysiis-original-mount'));
render(<PhoneticTester algorithm={refined} />, document.getElementById('nysiis-refined-mount'));
render(<PhoneticTester algorithm={phonex} />, document.getElementById('phonex-mount'));
render(<PhoneticTester algorithm={rogerRoot} />, document.getElementById('roger-root-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
render(<PhoneticTester algorithm={refinedSoundex} />, document.getElementById('soundex-refined-mount'));
render(<PhoneticTester algorithm={statcan} />, document.getElementById('statcan-mount'));
