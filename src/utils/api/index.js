import { getRecentDownloadsData } from './npm';
import {
  getRepoData,
  getRecentReleaseData,
  getContributorsData,
  getCommitsData,
} from './github';

export default async (url) => {
  if (!url) return 'no url was given';
  const repoData = await getRepoData(url);
  const releaseData = await getRecentReleaseData(url);
  const contributorsData = await getContributorsData(url);
  const commitsData = await getCommitsData(url);
  const downloadsData = await getRecentDownloadsData(url);

  return {
    ...repoData,
    ...releaseData,
    ...contributorsData,
    ...commitsData,
    ...downloadsData,
  };
};
