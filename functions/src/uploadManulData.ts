import { db, firebaseFn } from './setup';

const libJSON = require('../data/libraries.json');

const libraries = libJSON.default;

const writeLibrary = async (library: any) => {
  try {
    const document = db.doc(`libraries/${library.name.replace('/', '\\')}`);
    const doc = await document.get();
    const data = doc.exists ? { ...doc.data() } : {};
    const updatedData = { ...data, ...library };
    return document.set(updatedData);
  } catch (error) {
    return error;
  }
};

export const uploadManualData = firebaseFn.https.onRequest(
  (request, response) => {
    const promises = [];

    for (const library of libraries) {
      const p = writeLibrary(library);
      promises.push(p);
    }

    Promise.all(promises)
      .then(() => response.send('Uploading manual data is done'))
      .catch((err) => response.send(err));
  },
);
