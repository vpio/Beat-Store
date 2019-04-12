import React, { Component } from 'react';
import firebase from "firebase";
import logo from './logo.svg';
import './App.css';

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
    loading: true
  }

  componentDidMount() {
    db.ref('/beats').once('value').then((snapshot) => {
      // console.log(snapshot.val())
      let beatTable = [];
      let beats = snapshot.val();
      for (var x in beats) {
        beatTable.push(beats[x])
      }
      this.setState({ beats: beatTable, loading: false });
    })
  }

  render() {
    const {beats, loading} = this.state
    return (
      <div className="App">
          {loading ? <h3>Loading Beats...</h3> : beats.map((beat) => {
            console.log(beat)
            return (
              <React.Fragment>
                <h3>{beat.name}</h3>
                <h3>{beat.url}</h3>
              </React.Fragment>
            )
          })}
      </div>
    );
  }
}

export default App;
