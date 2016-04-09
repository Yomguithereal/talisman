import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';

const identity = v => v,
      equals = (a, b) => a === b;

const state = compose(
  withState('sequenceOne', 'setSequenceOne', ''),
  withState('sequenceTwo', 'setSequenceTwo', '')
);

const MetricTester = state(
  props => {
    const {
      metric,
      sequenceOne,
      sequenceTwo,
      setSequenceOne,
      setSequenceTwo
    } = props;

    let proxyOne = sequenceOne.split(/,\s*/),
        proxyTwo = sequenceTwo.split(/,\s*/);

    let result = '~';

    // If the sequence is only one element, we keep the single element
    if (proxyOne.length === 1)
      proxyOne = proxyOne[0];
    if (proxyTwo.length === 1)
      proxyTwo = proxyTwo[0];


    if (sequenceOne && sequenceTwo)
      result = metric(proxyOne, proxyTwo).toFixed(2);

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <TextInput placeholder="Sequence 1"
                         value={sequenceOne}
                         onChange={e => setSequenceOne(e.target.value)}
                         status="default" />
            </td>
            <td style={{width: '15%', textAlign: 'center'}}>
              <strong>{result}</strong>
            </td>
            <td>
              <TextInput placeholder="Sequence 2"
                         value={sequenceTwo}
                         onChange={e => setSequenceTwo(e.target.value)}
                         status="default" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
);

export default MetricTester;
