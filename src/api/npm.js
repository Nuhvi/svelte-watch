import axios from 'axios';

const BASE_ENDPOINT = 'https://api.npmjs.org/';

// Helpers

const pakageName = (url) => url.split('github.com/')[1].split('/')[1];

const handleError = (error) => {
  console.log(error && error.message);
  return {};
};

export const getRecentDownloadsData = async (url) => {
  const target =
    BASE_ENDPOINT + 'downloads/range/last-month/' + pakageName(url);

  try {
    const response = await axios.get(target);
    const data = response.data;
    const { downloads } = data;

    return {
      recentDownloadsCount: downloads.length,
    };
  } catch (error) {
    return handleError(error);
  }
};
