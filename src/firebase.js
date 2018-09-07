import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBaKxNljvCCArlFCj5YaKl52Ln-qeobrcE',
  authDomain: 'man-city-1f0e4.firebaseapp.com',
  databaseURL: 'https://man-city-1f0e4.firebaseio.com',
  projectId: 'man-city-1f0e4',
  storageBucket: 'man-city-1f0e4.appspot.com',
  messagingSenderId: '215173532941'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export { firebase, firebaseMatches };
