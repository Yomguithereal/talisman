import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import caverphone, {revisited} from 'talisman/phonetics/caverphone';
import cologne from 'talisman/phonetics/cologne';
import doubleMetaphone from 'talisman/phonetics/doubleMetaphone';
import metaphone from 'talisman/phonetics/metaphone';
import mra from 'talisman/phonetics/mra';
import nysiis, {refined} from 'talisman/phonetics/nysiis';
import soundex from 'talisman/phonetics/soundex';

const doubleMetaphoneRenderer = code => `[${code[0]}, ${code[1]}]`;

render(<PhoneticTester algorithm={caverphone} placeholder="Test the original version..." />, document.getElementById('caverphone-original-mount'));
render(<PhoneticTester algorithm={revisited} placeholder="Test the revisited version..." />, document.getElementById('caverphone-revisited-mount'));
render(<PhoneticTester algorithm={cologne} />, document.getElementById('cologne-mount'));
render(<PhoneticTester algorithm={doubleMetaphone} codeRenderer={doubleMetaphoneRenderer} />, document.getElementById('double-metaphone-mount'));
render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
render(<PhoneticTester algorithm={mra} />, document.getElementById('mra-mount'));
render(<PhoneticTester algorithm={nysiis} placeholder="Test the original version..." />, document.getElementById('nysiis-original-mount'));
render(<PhoneticTester algorithm={refined} placeholder="Test the refined version..." />, document.getElementById('nysiis-refined-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
