import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDOf5cDpyC4yTXvh-pV9nZTj5GP_Kchdhs",
  authDomain: "crwn-db-63295.firebaseapp.com",
  databaseURL: "https://crwn-db-63295.firebaseio.com",
  projectId: "crwn-db-63295",
  storageBucket: "",
  messagingSenderId: "266967810588",
  appId: "1:266967810588:web:8b84f58beb221494"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;