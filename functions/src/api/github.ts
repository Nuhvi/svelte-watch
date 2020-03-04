import axios from 'axios';

const BASE_ENDPOINT = 'https://api.github.com/';

// Helpers

const fullName = (url: string) => url.split('github.com/')[1];

const reposPath = (url: string) => BASE_ENDPOINT + 'repos/' + fullName(url);

const isRecentThan = (date: string, days: number) =>
  new Date(date).getTime() > new Date().getTime() - days * 86400000;

const handleError = (error: any) => {
  console.log(error && error.message);
  return {};
};

export const getRepoData = async (url: string) => {
  const target = reposPath(url);

  try {
    const response = await axios.get(target);
    const data = response.data;
    const { watchers, description } = data;

    return {
      stars: watchers,
      description,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getRecentReleaseData = async (url: string) => {
  const target = reposPath(url) + '/releases/latest';

  try {
    const response = await axios.get(target);
    const data = response.data;
    const { name, published_at } = data;

    return {
      version: name,
      lastestReleaseDate: published_at,
      hasRecentRelease: isRecentThan(published_at, 360),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getContributorsData = async (url: string) => {
  const target = reposPath(url) + '/contributors';

  try {
    const response = await axios.get(target);
    const contributorsCount = response.data.length;

    return {
      contributorsCount,
      hasMultipleContributers: contributorsCount > 1,
      hasManyContributers: contributorsCount > 7,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getCommitsData = async (url: string) => {
  const target = reposPath(url) + '/commits';

  try {
    const response = await axios.get(target);
    const commits = response.data;

    const recentCommitsCount = commits.filter((item: any) =>
      isRecentThan(item.commit.author.date, 90),
    ).length;

    return {
      recentCommitsCount,
      hasRecentCommits: recentCommitsCount > 5,
    };
  } catch (error) {
    return handleError(error);
  }
};
