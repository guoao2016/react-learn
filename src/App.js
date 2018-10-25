
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Props from './components/Props';
class App extends Component {
  
  render() {
    const user = {
      name: 'Anna',
      hobbies: ['sports', 'run']
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <Home />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <h1>hello!!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <h1><Props name ={"Max"} age={12} user={user}/></h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
