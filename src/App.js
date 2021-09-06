import React from 'react';

class Mai extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    // console.log(count);
    return (
      <>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <br></br>
        <br></br>
        <button onClick={this.decrement}>Decrement</button>
        <br></br>
        <br></br>
        <button onClick={this.reset}>Reset</button>
      </>
    );
  }
}

export default Mai;
