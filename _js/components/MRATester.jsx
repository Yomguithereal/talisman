import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';

const state = compose(
  withState('sequenceOne', 'setSequenceOne', ''),
  withState('sequenceTwo', 'setSequenceTwo', '')
);

const MRATester = state(
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

    let result = null;

    // If the sequence is only one element, we keep the single element
    if (proxyOne.length === 1 && proxyTwo.length === 1) {
      proxyOne = proxyOne[0];
      proxyTwo = proxyTwo[0];
    }

    // Computing result
    if (sequenceOne && sequenceTwo)
      result = metric(proxyOne, proxyTwo);

    let status = 'default';

    if (result)
      status = result.matching ? 'success' : 'error';

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <TextInput placeholder="Name 1"
                           value={sequenceOne}
                           onChange={e => setSequenceOne(e.target.value)}
                           status={status} />
              </td>
              <td style={{width: '15%', textAlign: 'center'}}>
                <strong>&middot;</strong>
              </td>
              <td>
                <TextInput placeholder="Name 2"
                           value={sequenceTwo}
                           onChange={e => setSequenceTwo(e.target.value)}
                           status={status} />
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <div>
            <strong>Minimum:</strong> {result ? result.minimum : ''}<br />
            <strong>Similarity:</strong> {result ? result.similarity : ''}<br />
            <strong>Codex:</strong> {result ? `[${result.codex[0]}, ${result.codex[1]}]` : ''}<br />
            <strong>Matching:</strong> {result ? '' + result.matching : ''}
          </div>
        </p>
      </div>
    );
  }
);

export default MRATester;
