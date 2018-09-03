import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/home';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact component={Home} path="/" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
