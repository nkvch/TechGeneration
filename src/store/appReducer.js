import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import devicesReducer from 'store/devicesReducer';

const appReducer = combineReducers({
  users: usersReducer,
  devices: devicesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
