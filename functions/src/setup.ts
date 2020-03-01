import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const database = admin.firestore();

export { functions, database };
