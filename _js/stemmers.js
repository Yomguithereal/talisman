import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import lancaster from 'talisman/stemmers/lancaster';
import lovins from 'talisman/stemmers/lovins';
import porter from 'talisman/stemmers/porter';
import sStemmer from 'talisman/stemmers/s-stemmer';
import ueaLite from 'talisman/stemmers/uea-lite';

render(<PhoneticTester algorithm={lancaster} />, document.getElementById('lancaster-mount'));
render(<PhoneticTester algorithm={lovins} />, document.getElementById('lovins-mount'));
render(<PhoneticTester algorithm={porter} />, document.getElementById('porter-mount'));
render(<PhoneticTester algorithm={sStemmer} />, document.getElementById('s-stemmer-mount'));
render(<PhoneticTester algorithm={ueaLite} />, document.getElementById('uea-lite-mount'));
