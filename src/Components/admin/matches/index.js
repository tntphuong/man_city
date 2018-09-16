import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseMatches } from '../../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: []
  };

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      const data = [];
      snapshot.forEach(snapchild => {
        data.push({
          ...snapchild.val(),
          id: snapchild.key
        });
      });
      this.setState({
        isLoading: false,
        matches: data.reverse()
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Matches</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.matches
                  ? this.state.matches.map((match, i) => (
                      <TableRow key={i}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.local} <strong>vs</strong> {match.away}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultLocal} <strong>-</strong>{' '}
                          {match.resultAway}
                        </TableCell>
                        <TableCell>
                          {match.final === 'Yes' ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Not played yet
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? <CircularProgress /> : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminMatches;
