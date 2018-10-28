import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
1.

*/
export default class ReduxTest extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <p>Redux</p>
          <p>{this.props.value}</p>
          <p className="test-center">
              <button className="btn btn-primary">Increase</button>
              <button className="btn btn-danger">Decrease</button>
          </p>
        </div>
      </div>
    );
  }
}

ReduxTest.propTypes = {
    value: PropTypes.number.isRequired
}
