import React, { Component } from 'react';
import { firebaseMatches } from '../../../firebase';
import MatchesBlock from '../../ui/matches_block';
import Bounce from 'react-reveal/Bounce';

class Block extends Component {
  state = {};

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        const data = [];
        snapshot.forEach(snapchild => {
          data.push({
            ...snapchild.val(),
            id: snapchild.key
          });
        });
        this.setState({
          matches: data.reverse()
        });
      });
  }

  showMatches = matches =>
    matches
      ? matches.map(match => (
          <Bounce left key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MatchesBlock match={match} />
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
