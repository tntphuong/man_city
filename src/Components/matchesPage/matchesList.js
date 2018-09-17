import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';
import { firebaseTeams, firebase } from '../../firebase';
import { Promise } from 'core-js';

class MatchesList extends Component {
  state = {
    isLoading: true,
    matcheslist: [],
    teamsUrl: []
  };

  componentDidMount() {
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
          teamsUrl
        });
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    return (state = {
      matcheslist: props.matches
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

  showMatches = () =>
    this.state.matcheslist || this.state.isLoading ? (
      <NodeGroup
        data={this.state.matcheslist}
        keyAccessor={d => d.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        update={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        leave={(d, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
      >
        {nodes => (
          <div>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                key={key}
                className="match_box_big"
                style={{
                  opacity,
                  transform: `translate(${x}px)`
                }}
              >
                <div className="block_wraper">
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: this.getUrlTeamIcon(data.localThmb)
                      }}
                    />
                    <div className="team">{data.local}</div>
                    <div className="result">{data.resultLocal}</div>
                  </div>
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: this.getUrlTeamIcon(data.awayThmb)
                      }}
                    />
                    <div className="team">{data.away}</div>
                    <div className="result">{data.resultAway}</div>
                  </div>
                </div>
                <div className="block_wraper nfo">
                  <div>
                    <strong>Date:</strong> {data.date}
                  </div>
                  <div>
                    <strong>Stadium:</strong> {data.stadium}
                  </div>
                  <div>
                    <strong>Referee:</strong> {data.referee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    ) : null;

  render() {
    return <div>{this.showMatches()}</div>;
  }
}

export default MatchesList;
