import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import cologne from 'talisman/phonetics/german/cologne';

render(<PhoneticTester algorithm={cologne} />, document.getElementById('cologne-mount'));
