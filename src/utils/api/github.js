require('dotenv').config();
import axios from 'axios';

const BASE_ENDPOINT = 'https://api.github.com/';
const GH_Client_Auth = `?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}`;

// Helpers

const fullName = (url) => url.split('github.com/')[1];

const reposPath = (url) => BASE_ENDPOINT + 'repos/' + fullName(url);

const isRecentThan = (date, days) =>
  new Date(date).getTime() > new Date().getTime() - days * 86400000;

const handleError = (error, target) => {
  console.log(`Github fetch: ${error},target was: ${target}`);
  return {};
};

export const getRepoData = async (url) => {
  const target = reposPath(url) + GH_Client_Auth;

  try {
    const response = await axios.get(target);
    const data = response.data;
    const { watchers, description } = data;

    return {
      stars: watchers,
      description,
    };
  } catch (error) {
    return handleError(error, target);
  }
};

export const getRecentReleaseData = async (url) => {
  const target = reposPath(url) + '/releases/latest' + GH_Client_Auth;

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
    return handleError(error, target);
  }
};

export const getContributorsData = async (url) => {
  const target = reposPath(url) + '/contributors' + GH_Client_Auth;

  try {
    const response = await axios.get(target);
    const contributorsCount = response.data.length;

    return {
      contributorsCount,
      hasMultipleContributers: contributorsCount > 1,
      hasManyContributers: contributorsCount > 7,
    };
  } catch (error) {
    return handleError(error, target);
  }
};

export const getCommitsData = async (url) => {
  const target = reposPath(url) + '/commits' + GH_Client_Auth;

  try {
    const response = await axios.get(target);
    const commits = response.data;

    const recentCommitsCount = commits.filter((item) =>
      isRecentThan(item.commit.author.date, 90),
    ).length;

    return {
      recentCommitsCount,
      hasRecentCommits: recentCommitsCount > 5,
    };
  } catch (error) {
    return handleError(error, target);
  }
};
