import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import naive from 'talisman/tokenizers/sentences/naive';

render(<TokenizerTester textarea={true} flow={false} tokenizer={naive} />, document.getElementById('naive-mount'));
