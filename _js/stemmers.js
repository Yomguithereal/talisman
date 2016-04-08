import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import lancaster from 'talisman/stemmers/lancaster';
import lovins from 'talisman/stemmers/lovins';
import porter from 'talisman/stemmers/porter';

render(<PhoneticTester algorithm={lancaster} />, document.getElementById('lancaster-mount'));
render(<PhoneticTester algorithm={lovins} />, document.getElementById('lovins-mount'));
render(<PhoneticTester algorithm={porter} />, document.getElementById('porter-mount'));
