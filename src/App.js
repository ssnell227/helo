import React, { Component } from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'

import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
