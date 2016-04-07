import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import caverphone, {revisited} from 'talisman/phonetics/caverphone';
import metaphone from 'talisman/phonetics/metaphone';
import soundex from 'talisman/phonetics/soundex';

render(<PhoneticTester algorithm={caverphone} placeholder="Test the original version..." />, document.getElementById('caverphone-original-mount'));
render(<PhoneticTester algorithm={revisited} placeholder="Test the revisited version..." />, document.getElementById('caverphone-revisited-mount'));
render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
