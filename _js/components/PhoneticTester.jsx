import React, {Component} from 'react';
import {withState} from 'recompose';
import TextInput from './TextInput.jsx';

const identity = v => v;

const PhoneticTester = withState(
  'value', 'setValue', '',
  props => {
    const {
      algorithm,
      placeholder = 'Test it here...',
      codeRenderer = identity,
      value,
      setValue
    } = props;

    const code = value ? codeRenderer(algorithm(value)) : '~';

    return (
      <div>
        <TextInput placeholder={placeholder}
                   value={value}
                   onChange={e => setValue(e.target.value)} />
        <div>
          <p style={{display: 'inline', fontSize: '1.3em'}}>
            <span>{code}</span>
          </p>
        </div>
      </div>
    );
  }
);

export default PhoneticTester;
