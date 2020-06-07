import React, { Component } from 'react';
import Nav from './components/Nav/Nav'
import Routes from './routes'
import {withRouter} from 'react-router-dom'

import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
       {this.props.location.pathname !== '/' && <Nav/>}
        {Routes}
      </div>
    );
  }
}

export default withRouter(App);
