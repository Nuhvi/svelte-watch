import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import libraries from './libraries';

admin.initializeApp();
const database = admin.firestore();

const writeLibrary = async (library: any) => {
  const document = database.doc(`libraries/${library.name.replace('/', '\\')}`);

  const fetchedData = await document.get().then((doc) => {
    const data = doc.exists ? { ...doc.data() } : {};
    return { ...data, ...library };
  });

  return document.set(fetchedData);
};

export const updateManulData = functions.https.onRequest(
  (request, response) => {
    const promises = [];

    for (const library of libraries) {
      const p = writeLibrary(library);
      promises.push(p);
    }

    Promise.all(promises)
      .then(() => response.send('done'))
      .catch((err) => response.send(err));
  },
);
