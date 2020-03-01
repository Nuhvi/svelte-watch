import axios from 'axios';

const BASE_ENDPOINT = 'https://api.github.com/';

const fullName = (url: string) => url.split('github.com/')[1];

const reposPath = (url: string) => BASE_ENDPOINT + 'repos/' + fullName(url);

// const decode64 = (raw: string) => Buffer.from(raw, 'base64').toString();

// const getPackageJSON = (url: string) => {
//   const target = reposPath(url) + '/contents/package.json';

//   return axios
//     .get(target)
//     .then((res) => JSON.parse(decode64(res.data.content)))
//     .catch((err) => `Failed to fetch ${target}`);
// };

// const getInfo = (url: string) => {
//   return getPackageJSON(url).then((data) => {
//     const { name, version, description, keywords } = data;
//     return { name, version, description, keywords };
//   });
// };

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
    return error;
  }
};

export const getRecentReleaseData = async (url: string) => {
  const target = reposPath(url) + '/releases/latest';

  try {
    const response = await axios.get(target);
    if (response.status !== 200) return false;
    const data = response.data;
    const { name, published_at } = data;

    return {
      version: name,
      lastesReleaseDate: published_at,
    };
  } catch (error) {
    return error;
  }
};

// Need
// Recent Commits :: Has there been more than five commits in the last three months?
// Multiple Contributors :: Has more than one contributor on GitHub
// Many Contributors :: Are there more than seven contributors on the project?
// Star Status :: Is the Github star count in the top 10% of plugins?
