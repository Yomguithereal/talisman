import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';

const identity = v => v,
      equals = (a, b) => a === b;

const state = compose(
  withState('wordOne', 'setWordOne', ''),
  withState('wordTwo', 'setWordTwo', '')
);

const PhoneticTester = state(
  props => {
    const {
      algorithm,
      codeRenderer = identity,
      comparator = equals,
      wordOne,
      wordTwo,
      setWordOne,
      setWordTwo
    } = props;

    const codeOne = wordOne ? algorithm(wordOne) : null,
          codeTwo = wordTwo ? algorithm(wordTwo) : null;

    const renderedCodeOne = codeOne ? codeRenderer(codeOne) : '',
          renderedCodeTwo = codeTwo ? codeRenderer(codeTwo) : '';

    let status = '\u00b7',
        className = 'default';

    if (codeOne && codeTwo) {
      if (comparator(codeOne, codeTwo)) {
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
              {renderedCodeOne}&nbsp;
            </td>
            <td />
            <td style={{fontSize: '1.3em', textAlign: 'center'}}>
              {renderedCodeTwo}&nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
);

export default PhoneticTester;
