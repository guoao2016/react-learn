import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    let content = "";
    if(true){
      content = "hello!";
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <h1>home</h1>
            <p>{this.props.test}</p>
            {
              content
            }
            {
              true?"hello":"world"
            }
          </div>
        </div>

      </div>
    );
  }
}
