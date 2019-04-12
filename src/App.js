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

class App extends Component {
  state = {
    beats: null
  }

  componentDidMount() {
    var storage = firebase.storage();
    var pathReference = storage.ref('beats/');

    pathReference.getDownloadURL().then(function(url){
      this.setState({ beats: url })
    }).catch(function(error) { alert('could not get file! Submit feedback to github.com/vpio') })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
