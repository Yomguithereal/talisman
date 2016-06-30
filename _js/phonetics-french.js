import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import phonetic from 'talisman/phonetics/french/phonetic';
import phonex from 'talisman/phonetics/french/phonex';
import sonnex from 'talisman/phonetics/french/sonnex';
import soundex from 'talisman/phonetics/french/soundex';
import soundex2 from 'talisman/phonetics/french/soundex2';

render(<PhoneticTester algorithm={phonetic} />, document.getElementById('phonetic-mount'));
render(<PhoneticTester algorithm={phonex} />, document.getElementById('phonex-mount'));
render(<PhoneticTester algorithm={sonnex} />, document.getElementById('sonnex-mount'));
render(<PhoneticTester algorithm={soundex} />, document.getElementById('soundex-mount'));
render(<PhoneticTester algorithm={soundex2} />, document.getElementById('soundex2-mount'));
