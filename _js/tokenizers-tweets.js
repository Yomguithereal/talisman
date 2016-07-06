import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import casual from 'talisman/tokenizers/tweets/casual';

render(<TokenizerTester tokenizer={casual} />, document.getElementById('casual-mount'));
