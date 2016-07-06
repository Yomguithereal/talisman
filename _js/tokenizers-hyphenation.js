import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import liang from 'talisman/tokenizers/hyphenation/liang';

render(<TokenizerTester tokenizer={liang} />, document.getElementById('liang-mount'));
