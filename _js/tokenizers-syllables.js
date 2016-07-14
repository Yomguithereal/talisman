import React from 'react';
import {render} from 'react-dom';
import TokenizerTester from './components/TokenizerTester.jsx';

import words from 'talisman/tokenizers/words/naive';
import {LegalipyTokenizer} from 'talisman/tokenizers/syllables/legalipy';
import sonoripy from 'talisman/tokenizers/syllables/sonoripy';

const buildTokenizer = text => {
  const tokens = words(text);

  const tokenizer = new LegalipyTokenizer();
  tokenizer.train(tokens);
  tokenizer.finalize();

  return tokenizer.tokenize.bind(tokenizer);
};

const trainingText = 'This is some training text: "History is the discovery, collection, organization, analysis, and presentation of information about past events. History can also mean a continuous, typically chronological record of important or public events or of a particular trend or institution. Scholars who write about history are called historians. It is a field of knowledge which uses a narrative to examine and analyse the sequence of events, and it sometimes attempts to objectively investigate the patterns of cause and effect that determine events. Historians debate the nature of history and its usefulness. This includes discussing the study of the discipline as an end in itself and as a way of providing "perspective" on the problems of the present. The stories common to a particular culture but not supported by external sources (such as the legends surrounding King Arthur) are usually classified as cultural heritage rather than as the "disinterested investigation" needed by the discipline of history. Events of the past prior to written record are considered prehistory."';

render(<TokenizerTester tokenizer={buildTokenizer} trained={true} training={trainingText} />, document.getElementById('legalipy-mount'));
render(<TokenizerTester tokenizer={sonoripy} />, document.getElementById('sonoripy-mount'));
