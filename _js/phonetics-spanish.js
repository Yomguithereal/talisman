import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import fonetico from 'talisman/phonetics/spanish/fonetico';

render(<PhoneticTester algorithm={fonetico} />, document.getElementById('fonetico-mount'));
