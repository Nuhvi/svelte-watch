import { functions } from './setup';
import api from './api';

export default functions.https.onRequest(async (request, response) => {
  const url = request.query.url;
  try {
    const stats = await api.getRepoData(url);
    const releaseData = await api.getRecentReleaseData(url);

    response.send(
      `Success: ${JSON.stringify({ stats })},${JSON.stringify({
        releaseData,
      })}`,
    );
  } catch (error) {
    response.send(`Error: ${error}`);
  }
});
