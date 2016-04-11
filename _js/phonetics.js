import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import caverphone, {revisited} from 'talisman/phonetics/caverphone';
import cologne from 'talisman/phonetics/cologne';
import daitchMokotoff from 'talisman/phonetics/daitch-mokotoff';
import doubleMetaphone from 'talisman/phonetics/double-metaphone';
import metaphone from 'talisman/phonetics/metaphone';
import mra from 'talisman/phonetics/mra';
import nysiis, {refined} from 'talisman/phonetics/nysiis';
import soundex, {refined as refinedSoundex} from 'talisman/phonetics/soundex';

const doubleMetaphoneRenderer = code => `[${code[0]}, ${code[1]}]`,
      doubleMetaphoneComparator = (a, b) => a[0] === b[0] || a[0] === b[1] || a[1] === b[0] || a[1] === b[1];

const daitchMokotoffRenderer = code => `[${code.join(', ')}]`,
      daitchMokotoffComparator = (a, b) => {
        const bSet = new Set(b);

        return a.some(code => bSet.has(code));
      };

render(<PhoneticTester algorithm={caverphone} />, document.getElementById('caverphone-original-mount'));
render(<PhoneticTester algorithm={revisited} />, document.getElementById('caverphone-revisited-mount'));
render(<PhoneticTester algorithm={cologne} />, document.getElementById('cologne-mount'));
render(<PhoneticTester algorithm={daitchMokotoff} codeRenderer={daitchMokotoffRenderer} comparator={daitchMokotoffComparator} />, document.getElementById('daitch-mokotoff-mount'));
render(<PhoneticTester algorithm={doubleMetaphone} codeRenderer={doubleMetaphoneRenderer} comparator={doubleMetaphoneComparator} />, document.getElementById('double-metaphone-mount'));
render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
render(<PhoneticTester algorithm={mra} />, document.getElementById('mra-mount'));
render(<PhoneticTester algorithm={nysiis} />, document.getElementById('nysiis-original-mount'));
render(<PhoneticTester algorithm={refined} />, document.getElementById('nysiis-refined-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
render(<PhoneticTester algorithm={refinedSoundex} />, document.getElementById('soundex-refined-mount'));
