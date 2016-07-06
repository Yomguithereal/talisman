import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import lines from 'talisman/tokenizers/lines/naive';

render(<TokenizerTester textarea={true} flow={false} tokenizer={lines} />, document.getElementById('naive-mount'));
