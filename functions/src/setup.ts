import * as admin from 'firebase-admin';
import * as firebaseFn from 'firebase-functions';

const config = {
  apiKey: process.env.FirebaseAPIKEY,
  authDomain: 'svelte-watch.firebaseapp.com',
  databaseURL: 'https://svelte-watch.firebaseio.com',
  projectId: 'svelte-watch',
  storageBucket: 'svelte-watch.appspot.com',
};

admin.initializeApp(config);
const db = admin.firestore();

export { firebaseFn, db };
