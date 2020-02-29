import * as functions from 'firebase-functions';
import githubApi from './api_github';

export const helloWorld = functions.https.onRequest((request, response) => {
  githubApi
    .getPackageJSON('https://github.com/c0bra/svelma')
    .then((data) => response.send(data))
    .catch((err) => response.send(err));
});
