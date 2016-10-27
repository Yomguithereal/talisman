import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import {minimal} from 'talisman/stemmers/spanish/unine';

render(<PhoneticTester algorithm={minimal} />, document.getElementById('unine-minimal-mount'));
