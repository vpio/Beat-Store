// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addBeat = functions.storage.bucket('beat-store-e5015.appspot.com').object().onFinalize((object) => {
  console.log(object)
  admin.database().ref('/beats').push({name: object.name, url: object.mediaLink})
})
