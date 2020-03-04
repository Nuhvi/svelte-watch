import * as admin from 'firebase-admin';
import * as firebaseFn from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

export { firebaseFn, db };
