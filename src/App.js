import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Home from './Components/home';
import SignIn from './Components/signin';
import MatchesPage from './Components/matchesPage';
import TeamPage from './Components/teamPage';
import NotFound from './Components/ui/not_found';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AdminPlayers from './Components/admin/players';
import AddEditPlayers from './Components/admin/players/addEditPlayers';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import './firebase';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute
              {...this.props}
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              {...this.props}
              exact
              path="/admin_players"
              component={AdminPlayers}
            />
            <PrivateRoute
              {...this.props}
              exact
              path="/admin_matches"
              component={AdminMatches}
            />
            <PrivateRoute
              {...this.props}
              exact
              path="/admin_matches/edit_match"
              component={AddEditMatch}
            />
            <PrivateRoute
              {...this.props}
              exact
              path="/admin_matches/edit_match/:id"
              component={AddEditMatch}
            />
            <PrivateRoute
              {...this.props}
              path="/admin_players/add_players"
              exact
              component={AddEditPlayers}
            />
            <PrivateRoute
              {...this.props}
              path="/admin_players/add_players/:id"
              exact
              component={AddEditPlayers}
            />
            <PublicRoutes
              restricted={false}
              {...this.props}
              exact
              component={Home}
              path="/"
            />
            <PublicRoutes
              restricted={true}
              {...this.props}
              exact
              component={SignIn}
              path="/sign_in"
            />
            <PublicRoutes
              restricted={false}
              {...this.props}
              exact
              component={MatchesPage}
              path="/the_matches"
            />
            <PublicRoutes
              restricted={false}
              {...this.props}
              exact
              component={TeamPage}
              path="/the_team"
            />
            <PublicRoutes
              restricted={false}
              {...this.props}
              exact
              component={NotFound}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
