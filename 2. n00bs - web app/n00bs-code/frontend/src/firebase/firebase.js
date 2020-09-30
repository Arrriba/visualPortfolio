import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAugzXfQlsIn4KHOGxg_gZp36cAX-vRaRM",
  authDomain: "n00bs-40d14.firebaseapp.com",
  databaseURL: "https://n00bs-40d14.firebaseio.com",
  projectId: "n00bs-40d14",
  storageBucket: "n00bs-40d14.appspot.com",
  messagingSenderId: "340107414780",
  appId: "1:340107414780:web:06b8bee494d4de0a6cdb79",
  measurementId: "G-DHN58R9B9Y"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
