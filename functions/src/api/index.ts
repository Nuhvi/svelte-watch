import * as githubAPI from './github';
import * as npmAPI from './npm';

export default {
  ...githubAPI,
  ...npmAPI,
};
