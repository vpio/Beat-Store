import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Players from 'tone/Tone/source/Players';
import PlayButton from './PlayButton.js';

const styles = theme => ({
  root: {
    width: '85%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, url) {
  id += 1;
  return { id, name, url};
}

const rows = [];

const handleStart = (players, name) => {
  if (players.state === 'started') { players.stopAll() }
  players.get(name).start();
}

const handleStop = (players, name) => {
  if (players.state === 'started') { players.stopAll() }
}

function BeatPlayer(props) {
  const { classes, beats } = props;
  const player = new Players(beats).toMaster();

  if (rows.length < 1){
    for (let x in beats) {
      rows.push(createData(x, beats[x]))
    }
  }

  console.log('rows!',rows)

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} onClick={() => { console.log('hi')}}>
              <TableCell component="th" scope="row">
                <PlayButton startTrack={() => handleStart(player, row.name)} stopTrack={() => handleStop(player, row.name)}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">$20.00</TableCell>
              <TableCell align="right"><Button onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.addItem(e)}}>Add to Cart</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

BeatPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BeatPlayer);
