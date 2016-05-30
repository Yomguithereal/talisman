import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import naive from 'talisman/tokenizers/words/naive';
import treebank from 'talisman/tokenizers/words/treebank';

render(<TokenizerTester tokenizer={naive} />, document.getElementById('naive-mount'));
render(<TokenizerTester tokenizer={treebank} />, document.getElementById('treebank-mount'));
