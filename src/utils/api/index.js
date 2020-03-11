import axios from 'axios';

export default async () => {
  try {
    const response = await axios.get(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/'
          : process.env.FETCH_STATS_URL
      }`,
    );
    const stats = response.data;
    return stats;
  } catch (error) {
    console.error({ error });
  }
};
