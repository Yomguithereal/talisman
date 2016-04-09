import React from 'react';
import {render} from 'react-dom';
import MetricTester from './components/MetricTester.jsx';

import cosine from 'talisman/metrics/cosine';
import dice from 'talisman/metrics/dice';
import euclidean from 'talisman/metrics/euclidean';
import hamming from 'talisman/metrics/hamming';
import jaccard from 'talisman/metrics/jaccard';
import jaro from 'talisman/metrics/jaro';
import jaroWinkler from 'talisman/metrics/jaro-winkler';
import levenshtein from 'talisman/metrics/levenshtein';
import manhattan from 'talisman/metrics/manhattan';
import mra from 'talisman/metrics/mra';
import overlap from 'talisman/metrics/overlap';
import sorensen from 'talisman/metrics/sorensen';
import tversky from 'talisman/metrics/tversky';

render(<MetricTester metric={dice} />, document.getElementById('dice-mount'));
render(<MetricTester metric={jaccard} />, document.getElementById('jaccard-mount'));
render(<MetricTester metric={jaro} />, document.getElementById('jaro-mount'));
render(<MetricTester metric={jaroWinkler} />, document.getElementById('jaro-winkler-mount'));
render(<MetricTester metric={levenshtein} integer={true} />, document.getElementById('levenshtein-mount'));
render(<MetricTester metric={overlap} />, document.getElementById('overlap-mount'));
