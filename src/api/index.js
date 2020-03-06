import * as githubAPI from './github';
import * as npmAPI from './npm';

const api = {
  ...githubAPI,
  ...npmAPI,
};

import { firebaseFn, db } from './setup';

export const updateStats = async (url) => {
  if (!url) return 'no url was given';

  try {
    const repoData = await api.getRepoData(url);
    const releaseData = await api.getRecentReleaseData(url);
    const contributorsData = await api.getContributorsData(url);
    const commitsData = await api.getCommitsData(url);
    const downloadsData = await api.getRecentDownloadsData(url);

    return {
      ...repoData,
      ...releaseData,
      ...contributorsData,
      ...commitsData,
      ...downloadsData,
    };
  } catch (error) {
    throw Error(error);
  }
};

// const calculateScore = (libraryData: any) => {
//   let score = 0;
//   score += libraryData.hasRecentRelease;
//   score += libraryData.hasMultipleContributers;
//   score += libraryData.hasManyContributers;
//   score += libraryData.hasRecentCommits;
//   score += libraryData.hasTests;
//   score += libraryData.hasExamples;
//   score += libraryData.hasDocumentedAPI;
//   score += libraryData.hasCIsetup;

//   return score;
// };

export const updateStats = firebaseFn.https.onRequest(
  async (request, response) => {
    try {
      const libraries = [];
      const snapshots = await db.collection('libraries').get();

      let fetchedStats;

      snapshots.forEach(async (doc) => {
        const libraryData = doc.data();
        fetchedStats = await fetchStats(libraryData.url);
        // const joinedData = { ...libraryData, ...fetchedStats };
        // const score = calculateScore(joinedData);

        libraries.push({ ...libraryData, ...fetchedStats });
      });

      // libraries.forEach((libraryData) => {
      //   db.doc(`libraries/${libraryData.name}`);
      // });

      response.json(fetchedStats);
    } catch (error) {
      response.send(`Error: ${error}`);
    }
  },
);
