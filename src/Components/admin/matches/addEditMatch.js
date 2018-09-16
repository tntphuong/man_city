import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';

import { firebaseMatches, firebaseTeams, firebaseDB } from '../../../firebase';

class AddEditMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formdata: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a away team',
          name: 'select_away',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away',
          name: 'result_away_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'Win', value: 'Win' },
            { key: 'Lose', value: 'Lose' },
            { key: 'Draw', value: 'Draw' },
            { key: 'n/a', value: 'n/a' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played',
          name: 'select_played',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      }
    }
  };

  InputOnChange = (e, id) => {
    const newformdata = { ...this.state.formdata };
    const newElement = { ...newformdata[id] };

    newElement.value = e.target.value;

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newformdata[id] = newElement;

    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  fillAllInput = (match, options, teams, type, matchId) => {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }

      if (key === 'away' || key === 'local') {
        newFormdata[key].config.options = options;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formdata: newFormdata,
      teams
    });
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;

    const getTeams = (match, type) => {
      let options = [];
      let teams = [];

      firebaseTeams.once('value').then(snapshot => {
        snapshot.forEach(team => {
          options.push({
            key: team.val().shortName,
            value: team.val().shortName
          });

          teams.push(team.val());
        });
        this.fillAllInput(match, options, teams, type, matchId);
      });
    };

    if (!matchId) {
      getTeams(false, 'Add Match');
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, 'Edit Match');
        });
    }
  }

  submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });

    if (formIsValid) {
      if (this.state.formType === 'Edit Match') {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.setState({
              formSuccess: 'Updated correctly'
            });

            setTimeout(() => {
              this.setState({
                formSuccess: ''
              });
            }, 2000);
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else if (this.state.formType === 'Add Match') {
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_matches');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>

          <div>
            <form onSubmit={this.submitForm} />
            <FormField
              id={'date'}
              formdata={this.state.formdata.date}
              onChangeFunc={(e, id) => this.InputOnChange(e, id)}
            />
            <div className="select_team_layout">
              <div className="label_inputs">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'local'}
                    formdata={this.state.formdata.local}
                    onChangeFunc={(e, id) => this.InputOnChange(e, id)}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultLocal'}
                    formdata={this.state.formdata.resultLocal}
                    onChangeFunc={(e, id) => this.InputOnChange(e, id)}
                  />
                </div>
              </div>
            </div>

            <div className="select_team_layout">
              <div className="label_inputs">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'away'}
                    formdata={this.state.formdata.away}
                    onChangeFunc={(e, id) => this.InputOnChange(e, id)}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultAway'}
                    formdata={this.state.formdata.resultAway}
                    onChangeFunc={(e, id) => this.InputOnChange(e, id)}
                  />
                </div>
              </div>
            </div>

            <div className="split_fields">
              <FormField
                id={'referee'}
                formdata={this.state.formdata.referee}
                onChangeFunc={(e, id) => this.InputOnChange(e, id)}
              />

              <FormField
                id={'stadium'}
                formdata={this.state.formdata.stadium}
                onChangeFunc={(e, id) => this.InputOnChange(e, id)}
              />
            </div>

            <div className="split_fields last">
              <FormField
                id={'result'}
                formdata={this.state.formdata.result}
                onChangeFunc={(e, id) => this.InputOnChange(e, id)}
              />

              <FormField
                id={'final'}
                formdata={this.state.formdata.final}
                onChangeFunc={(e, id) => this.InputOnChange(e, id)}
              />
            </div>

            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Something is wrong</div>
            ) : null}

            <div className="admin_submit">
              <button onClick={this.submitForm}>{this.state.formType}</button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
