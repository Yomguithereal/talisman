import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import cologne from 'talisman/phonetics/german/cologne';
import phonem from 'talisman/phonetics/german/phonem';

render(<PhoneticTester algorithm={cologne} />, document.getElementById('cologne-mount'));
render(<PhoneticTester algorithm={phonem} />, document.getElementById('phonem-mount'));
