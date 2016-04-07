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
          code = value ? codeRenderer(algorithm(value)) : '~';

    return (
      <div>
        <div>
          <input type="text"
                 placeholder={placeholder}
                 onChange={e => this.setState({value: e.target.value})}
                 value={this.state.value} />
          <span className="bar" />
        </div>
        <div>
          <p style={{display: 'inline', fontSize: '1.3em'}}>
            <span>{code}</span>
          </p>
        </div>
      </div>
    );
  }
}
