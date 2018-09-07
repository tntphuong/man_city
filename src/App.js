import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/home';
import MatchesPage from './Components/matchesPage';
import TeamPage from './Components/teamPage';
import './firebase';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={MatchesPage} path="/the_matches" />
            <Route exact component={TeamPage} path="/the_team" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
