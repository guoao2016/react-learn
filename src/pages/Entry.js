import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Entry extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <img src={logo} width="200" alt="logo" />
        </div>
      </div>
    );
  }
}
