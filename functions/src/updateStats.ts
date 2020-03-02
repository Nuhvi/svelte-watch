import { functions } from './setup';
import api from './api';

export default functions.https.onRequest(async (request, response) => {
  const url = request.query.url;
  try {
    const repoData = await api.getRepoData(url);
    const releaseData = await api.getRecentReleaseData(url);
    const contributorsData = await api.getContributorsData(url);
    const commitsData = await api.getCommitsData(url);

    const stats = {
      ...repoData,
      ...releaseData,
      ...contributorsData,
      ...commitsData,
    };

    response.send(`Success: ${JSON.stringify(stats)}`);
  } catch (error) {
    response.send(`Error: ${error} // target: ${url}`);
  }
});
