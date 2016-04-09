import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';
import TextArea from './TextArea.jsx';

const state = compose(
  withState('input', 'setInput', '')
);

const TokenizerTester = state(
  props => {
    const {
      tokenizer,
      input,
      setInput,
      textarea = false,
      flow = true
    } = props;

    const Component = textarea ? TextArea : TextInput;

    // Tokens
    const tokens = input ? tokenizer(input) : [];

    return (
      <div style={{width: '55%'}}>
        <Component placeholder="Enter raw text here..."
                   value={input}
                   onChange={e => setInput(e.target.value)} />
        <p style={{width: '100%'}}>
          {tokens.map(token => flow ?
            <span className="token">{token}</span> :
            <div className="token">{token}</div>)}
        </p>
      </div>
    );
  }
);

export default TokenizerTester;
