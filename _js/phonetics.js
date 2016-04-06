import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import metaphone from 'talisman/phonetics/metaphone';

render(<PhoneticTester algorithm={metaphone} />, document.getElementById('metaphone-mount'));
