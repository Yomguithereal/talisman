import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';

const cannotCoerceToNumber = n => isNaN(+n);

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
      setSequenceTwo,
      integerResult = false,
      sameDimension = false,
      enforceNumbers = false
    } = props;

    let proxyOne = sequenceOne.split(/,\s*/),
        proxyTwo = sequenceTwo.split(/,\s*/);

    let result = '~',
        error = null;

    // If the sequence is only one element, we keep the single element
    if (proxyOne.length === 1 && proxyTwo.length === 1) {
      proxyOne = proxyOne[0];
      proxyTwo = proxyTwo[0];
    }

    // Checking errors
    if (sameDimension && proxyOne.length !== proxyTwo.length)
      error = <span className="error">The compared vectors are not of the same dimension.</span>;

    if (enforceNumbers &&
        ([].concat(proxyOne).some(cannotCoerceToNumber) ||
         [].concat(proxyTwo).some(cannotCoerceToNumber)))
      error = <span className="error">This algorithm only accepts numbers.</span>;

    // Computing result
    if (!error && sequenceOne && sequenceTwo) {
      result = metric(proxyOne, proxyTwo)

      // Beautifying the result
      if (!integerResult && result && result !== 1)
      result = result.toFixed(2);
    }

    return (
      <div>
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
        <div>{error}&nbsp;</div>
      </div>
    );
  }
);

export default MetricTester;
