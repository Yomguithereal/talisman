import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';

const identity = v => v;

const state = compose(
  withState('wordOne', 'setWordOne', ''),
  withState('wordTwo', 'setWordTwo', '')
);

const PhoneticTester = state(
  props => {
    const {
      algorithm,
      codeRenderer = identity,
      wordOne,
      wordTwo,
      setWordOne,
      setWordTwo
    } = props;

    const codeOne = wordOne ? codeRenderer(algorithm(wordOne)) : '~',
          codeTwo = wordTwo ? codeRenderer(algorithm(wordTwo)) : '~';

    let status = '\u00b7',
        className = 'default';

    if (codeOne !== '~' && codeTwo !== '~') {
      if (codeOne === codeTwo) {
        status = '=~';
        className = 'success';
      }
      else {
        status = '!~';
        className = 'error';
      }
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <TextInput placeholder="Word 1"
                         value={wordOne}
                         onChange={e => setWordOne(e.target.value)}
                         status={className} />
            </td>
            <td style={{width: '15%', textAlign: 'center'}}>
              <strong>{status}</strong>
            </td>
            <td>
              <TextInput placeholder="Word 2"
                         value={wordTwo}
                         onChange={e => setWordTwo(e.target.value)}
                         status={className} />
            </td>
          </tr>
          <tr>
            <td style={{fontSize: '1.3em', textAlign: 'center'}}>
              {codeOne}
            </td>
            <td />
            <td style={{fontSize: '1.3em', textAlign: 'center'}}>
              {codeTwo}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
);

export default PhoneticTester;
