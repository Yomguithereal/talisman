import React, {Component} from 'react';

export default class PhoneticTester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  render() {
    const algorithm = this.props.algorithm,
          value = this.state.value,
          code = value ? algorithm(value) : null;

    return (
      <div>
        <input type="text"
               placeholder="Test it here..."
               onChange={e => this.setState({value: e.target.value})}
               value={this.state.value} />
        <strong>Result:</strong> {code}
      </div>
    );
  }
}
