import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import fingerprint from 'talisman/keyers/fingerprint';
import ngramFingerprint from 'talisman/keyers/ngram-fingerprint';
import omission from 'talisman/keyers/omission';
import skeleton from 'talisman/keyers/skeleton';

render(<PhoneticTester algorithm={fingerprint} />, document.getElementById('fingerprint-mount'));
render(<PhoneticTester algorithm={ngramFingerprint.bind(null, 2)} />, document.getElementById('bigram-fingerprint-mount'));
render(<PhoneticTester algorithm={ngramFingerprint.bind(null, 3)} />, document.getElementById('trigram-fingerprint-mount'));
render(<PhoneticTester algorithm={omission} />, document.getElementById('omission-mount'));
render(<PhoneticTester algorithm={skeleton} />, document.getElementById('skeleton-mount'));
