import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import caumanns from 'talisman/stemmers/german/caumanns';

render(<PhoneticTester algorithm={caumanns} />, document.getElementById('caumanns-mount'));
