import React, {Component} from 'react';

const identity = v => v;

export default class PhoneticTester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    const {
      algorithm,
      placeholder = 'Test it here...',
      codeRenderer = identity
    } = this.props;

    const value = this.state.value,
          code = value ? codeRenderer(algorithm(value)) : null;

    return (
      <div>
        <input type="text"
               placeholder={placeholder}
               onChange={e => this.setState({value: e.target.value})}
               value={this.state.value} />
        <p style={{display: 'inline', fontSize: '1.3em'}}>
          <strong>Result:</strong> {code}
        </p>
      </div>
    );
  }
}
