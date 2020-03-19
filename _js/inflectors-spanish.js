import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import {singularize} from 'talisman/inflectors/spanish';

render(<PhoneticTester algorithm={singularize} />, document.getElementById('singularize-mount'));
