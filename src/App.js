import React, { Component } from 'react';
import firebase from "firebase";
import logo from './logo.svg';
import './App.css';
import Players from 'tone/Tone/source/Players';
import Dashboard from './components/Dashboard';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlTHNVntwcV87Hr62sk__-uRpD0qaDjTY",
  authDomain: "beat-store-e5015.firebaseapp.com",
  databaseURL: "https://beat-store-e5015.firebaseio.com",
  projectId: "beat-store-e5015",
  storageBucket: "beat-store-e5015.appspot.com",
  messagingSenderId: "562866262962"
};
firebase.initializeApp(config);
const db = firebase.database()

class App extends Component {
  state = {
    beats: null,
    loading: true,
    media: {}
  }

  componentDidMount() {
    db.ref('/beats').once('value').then((snapshot) => {
      // console.log(snapshot.val())
      let beatTable = [];
      let beats = snapshot.val();
      for (var x in beats) {
        beatTable.push(beats[x])
      }
      let urls = {};

      beatTable.forEach((beat) => {
        let splitName = beat.name.split('.')
        let formattedName = splitName[0]
        urls[formattedName] = beat.url
      })

      this.setState({ beats: beatTable, loading: false, media: urls });
    })
  }

  handleListen = (players, name) => {
    if (players.state === 'started') { players.stopAll() }
    players.get(name).start();
  }

  handleStop = (player) => {
    player.stopAll();
  }

  render() {
    const {beats, loading, media} = this.state
    let player;
    let test;
    if (!loading) {
      player = new Players(media).toMaster();
      console.log('player', media)
    }
    return (
      <div className="App">
        <Dashboard
          beats={this.state.media}
          />
      </div>
    );
  }
}

export default App;
