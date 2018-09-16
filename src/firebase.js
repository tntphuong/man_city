import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

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
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebaseDB,
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers
};
