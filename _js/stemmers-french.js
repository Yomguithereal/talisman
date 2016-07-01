import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import porter from 'talisman/stemmers/french/porter';
import {minimal, complex} from 'talisman/stemmers/french/unine';

render(<PhoneticTester algorithm={porter} />, document.getElementById('porter-mount'));
render(<PhoneticTester algorithm={minimal} />, document.getElementById('unine-minimal-mount'));
render(<PhoneticTester algorithm={complex} />, document.getElementById('unine-complex-mount'));
