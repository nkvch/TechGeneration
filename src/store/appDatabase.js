import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyBk4cJ4xKXQPKGoPaCH_iAee_sT_hDJyws",
  authDomain: "air-wut.firebaseapp.com",
  databaseURL: "https://air-wut-default-rtdb.firebaseio.com/",
  projectId: "air-wut",
  storageBucket: "air-wut.appspot.com",
  messagingSenderId: "932136813553",
  appId: "1:932136813553:web:e90ca94db1c088f0c6fa50"
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;