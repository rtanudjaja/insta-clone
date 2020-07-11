// Your web app's Firebase configuration
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDar2SSmCnQRQeYrD-Cp1sGDeYAbEeYD4g",
  authDomain: "fb-r-messenger.firebaseapp.com",
  databaseURL: "https://fb-r-messenger.firebaseio.com",
  projectId: "fb-r-messenger",
  storageBucket: "fb-r-messenger.appspot.com",
  messagingSenderId: "314792489711",
  appId: "1:314792489711:web:de562fcccb4db1ad4ea11a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }
