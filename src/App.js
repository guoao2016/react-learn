import React, { Component } from 'react';

// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MyProps from './components/MyProps';

import Entry from './pages/Entry';
import About from './pages/About';
import Vip from './pages/Vip';
import ReduxTest from './pages/ReduxTest';
import AntTable from './pages/AntTable';
import AntTableAuto from './pages/AntTableAuto';

class App extends Component {

  render() {
    const user = {
      name: 'Anna',
      hobbies: ['sports', 'run']
    }
    return (
      <div>
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
            <MyProps name={"Max"} age={12} user={user}>
              <p>I an child</p>
            </MyProps>
          </div>
        </div>

        <div className="row">
          <p>Redux</p>
          <p>{this.props.value}</p>
          <p className="test-center">
            <button onClick={this.props.onIncrement} className="btn btn-primary">Increase</button>
            <button onClick={this.props.onDecrement} className="btn btn-danger">Decrease</button>
          </p>
        </div>
        {/* <div className="row">
          <div className="col-xs-1 clo-xs-offset-11">
            <ReduxTest value={1} />
          </div>
        </div> */}
      </div>

      {/*  上面做布局，路由部分做content*/}
        <Router history={hashHistory}>
          <Route path="/" component={Entry} />
          <Route path="/about" component={About} />
          <Route path="/vip" component={Vip} />
          <Route path="/redux" component={ReduxTest} />
          <Route path="/antTable" component={AntTable} />
          <Route path="/antTable2" component={AntTableAuto} />
        </Router>
      </div>  
    );
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired
}


export default App;


