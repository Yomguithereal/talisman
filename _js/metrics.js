import React from 'react';
import {render} from 'react-dom';
import MetricTester from './components/MetricTester.jsx';

import jaccard from 'talisman/metrics/jaccard';

render(<MetricTester metric={jaccard} />, document.getElementById('jaccard-mount'));
