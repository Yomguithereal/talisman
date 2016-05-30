import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import porter from 'talisman/stemmers/french/porter';

render(<PhoneticTester algorithm={porter} />, document.getElementById('porter-mount'));
