import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.FirebaseAPIKEY,
  authDomain: 'svelte-watch.firebaseapp.com',
  databaseURL: 'https://svelte-watch.firebaseio.com',
  projectId: 'svelte-watch',
  storageBucket: 'svelte-watch.appspot.com',
};

firebase.initializeApp(config);

export default firebase.firestore();
