import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import gersam from 'talisman/tokenizers/words/gersam';
import naive from 'talisman/tokenizers/words/naive';
import treebank from 'talisman/tokenizers/words/treebank';

const enGersam = gersam.bind(null, 'en'),
      frGersam = gersam.bind(null, 'fr');

render(<TokenizerTester tokenizer={enGersam} />, document.getElementById('en-gersam-mount'));
render(<TokenizerTester tokenizer={frGersam} />, document.getElementById('fr-gersam-mount'));
render(<TokenizerTester tokenizer={naive} />, document.getElementById('naive-mount'));
render(<TokenizerTester tokenizer={treebank} />, document.getElementById('treebank-mount'));
