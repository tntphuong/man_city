import React, { Component } from 'react';
import { firebaseMatches, firebaseTeams, firebase } from '../../../firebase';
import MatchesBlock from '../../ui/matches_block';
import Bounce from 'react-reveal/Bounce';
import { Promise } from 'core-js';

class Block extends Component {
  state = {
    isLoading: true,
    matches: [],
    teamsUrl: []
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const data = [];
        snapshot.forEach(snapchild => {
          data.push({
            ...snapchild.val(),
            id: snapchild.key
          });
        });

        const teams = [];
        const teamsUrl = [];
        firebaseTeams.once('value').then(snapshot => {
          snapshot.forEach(team => {
            teams.push(team.val().thmb + '.png');
          });

          let promises = [];

          teams.forEach(team => {
            promises.push(
              new Promise((resolve, reject) => {
                firebase
                  .storage()
                  .ref('team_icons')
                  .child(team)
                  .getDownloadURL()
                  .then(url => {
                    teamsUrl.push(url);
                    resolve();
                  });
              })
            );
          });

          Promise.all(promises).then(() => {
            this.setState({
              isLoading: false,
              matches: data.reverse(),
              teamsUrl
            });
          });
        });
      });
  }

  getUrlTeamIcon = team => {
    let returnUrl;
    if (!this.state.isLoading) {
      const { teamsUrl } = this.state;

      for (let child of teamsUrl) {
        if (child.search(team) !== -1) {
          returnUrl = `url(${child})`;
          break;
        }
      }
    }
    return returnUrl;
  };

  showMatches = matches =>
    matches
      ? matches.map(match => (
          <Bounce left key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MatchesBlock match={match} func={this.getUrlTeamIcon} />
              </div>
            </div>
          </Bounce>
        ))
      : null;

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Block;
