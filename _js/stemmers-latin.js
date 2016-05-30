import React from 'react';
import {render} from 'react-dom';
import PhoneticTester from './components/PhoneticTester.jsx';

import schinke from 'talisman/stemmers/latin/schinke';

const schinkeRenderer = stems => {
  return (
    <span>
      <strong>N:</strong> {stems.noun} - <strong>V:</strong> {stems.verb}
    </span>
  );
};

const schinkeComparator = (a, b) => {
  return a.noun === b.noun || a.verb === b.verb;
}

render(<PhoneticTester algorithm={schinke} codeRenderer={schinkeRenderer} comparator={schinkeComparator} />, document.getElementById('schinke-mount'));
