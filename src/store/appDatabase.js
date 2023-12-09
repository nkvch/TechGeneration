import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyBCzdZIBsALtlbRN_Jjb6w-qzqvWUvfIzE",
  authDomain: "hackatoniot-tech.firebaseapp.com",
  databaseURL: "https://hackatoniot-tech-default-rtdb.firebaseio.com",
  projectId: "hackatoniot-tech",
  storageBucket: "hackatoniot-tech.appspot.com",
  messagingSenderId: "1024177713911",
  appId: "1:1024177713911:web:046997b4c9d9b562de59f2",
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
