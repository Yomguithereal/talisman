import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import paragraphs from 'talisman/tokenizers/paragraphs/naive';

render(<TokenizerTester textarea={true} flow={false} tokenizer={paragraphs} />, document.getElementById('naive-mount'));
