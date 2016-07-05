import React, {Component} from 'react';
import {compose, withState} from 'recompose';
import TextInput from './TextInput.jsx';
import TextArea from './TextArea.jsx';

const state = compose(
  withState('input', 'setInput', ''),
  withState('training', 'setTraining', props => props.training || '')
);

const TokenizerTester = state(
  props => {
    const {
      tokenizer,
      input,
      setInput,
      training,
      setTraining,
      textarea = false,
      trained = false,
      flow = true
    } = props;

    const Component = textarea ? TextArea : TextInput;

    // Tokens
    let tokens;

    if (!trained)
      tokens = input ? tokenizer(input) : [];
    else
      tokens = input ? tokenizer(training)(input): [];

    return (
      <div style={{width: '55%'}}>
        <div>
          {trained &&
            <TextArea placeholder="Enter training text here..."
                      value={training}
                      onChange={e => setTraining(e.target.value)}
                      faded={true} />}
          <Component placeholder="Enter raw text here..."
                     value={input}
                     onChange={e => setInput(e.target.value)} />
          <p style={{width: '100%'}}>
            {tokens.map(token => flow ?
              <span className="token" style={{float: 'left'}}>{token}</span> :
              <div className="token">{token}</div>)}
          </p>
        </div>
        <div style={{clear: 'both'}} />
      </div>
    );
  }
);

export default TokenizerTester;
