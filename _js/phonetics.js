import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import metaphone from 'talisman/phonetics/metaphone';
import soundex from 'talisman/phonetics/soundex';

render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
