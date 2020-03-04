import { firebaseFn } from './setup';
import api from './api';

const calculateStats = async (url: string) => {
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

export const updateStats = firebaseFn.https.onRequest((request, response) => {
  const url = request.query.url;
  if (!url) response.send('no url was given');
  calculateStats(url)
    .then((stats) => {
      response.json(stats);
    })
    .catch((error) => {
      response.send(`Error: ${error} // target: ${url}`);
    });
});
