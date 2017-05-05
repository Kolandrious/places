import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import App from './components/App'

const config = {
  apiKey: "AIzaSyDG7CA99oijsDnQxwzdZwr8X7rtDR6XH3E",
  authDomain: "places-b6d82.firebaseapp.com",
  databaseURL: "https://places-b6d82.firebaseio.com",
  projectId: "places-b6d82",
  storageBucket: "places-b6d82.appspot.com",
  messagingSenderId: "407694118120"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
