import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import fingerprint, {ngramsFingerprint} from 'talisman/keyers/fingerprint';
import omission from 'talisman/keyers/omission';
import skeleton from 'talisman/keyers/skeleton';

render(<PhoneticTester algorithm={fingerprint} />, document.getElementById('fingerprint-mount'));
render(<PhoneticTester algorithm={ngramsFingerprint.bind(null, 2)} />, document.getElementById('bigram-fingerprint-mount'));
render(<PhoneticTester algorithm={ngramsFingerprint.bind(null, 3)} />, document.getElementById('trigram-fingerprint-mount'));
render(<PhoneticTester algorithm={omission} />, document.getElementById('omission-mount'));
render(<PhoneticTester algorithm={skeleton} />, document.getElementById('skeleton-mount'));
