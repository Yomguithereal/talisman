import React, {Component} from 'react';

export default class PhoneticTester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    const algorithm = this.props.algorithm,
          placeholder = this.props.placeholder || 'Test it here...',
          value = this.state.value,
          code = value ? algorithm(value) : null;

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
