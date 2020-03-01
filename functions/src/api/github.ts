import axios from 'axios';

const BASE_ENDPOINT = 'https://api.github.com/';

const parseUrl = (url: string) => url.split('github.com/')[1];

const decode64 = (raw: string) => Buffer.from(raw, 'base64').toString();

const getPackageJSON = (url: string) => {
  const target =
    BASE_ENDPOINT + 'repos/' + parseUrl(url) + '/contents/package.json';

  return axios
    .get(target)
    .then((res) => JSON.parse(decode64(res.data.content)))
    .catch((err) => `Failed to fetch ${target}`);
};

const getInfo = (url: string) => {
  return getPackageJSON(url).then((data) => {
    const { name, version, description, keywords } = data;
    return { name, version, description, keywords };
  });
};

export default {
  getPackageJSON,
  getInfo,
};
