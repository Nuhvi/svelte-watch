import fetchData from './api';
const calculateScore = (libraryData) => {
  let score = 0;
  score += libraryData.hasRecentRelease;
  score += libraryData.hasMultipleContributers;
  score += libraryData.hasManyContributers;
  score += libraryData.hasRecentCommits;
  score += libraryData.hasTests;
  score += libraryData.hasExamples;
  score += libraryData.hasDocumentedAPI;
  score += libraryData.hasCIsetup;

  return score;
};

export default (data) => {
  // const promises = data.map((library) => fetchData(library.url));
  // Promise.all(promises).then((allFetchedData) => {
  //   allFetchedData.forEach((libraryFetchedData, index) => {
  //     const libraryData = data[index];
  //     data[index] = { ...libraryData, ...libraryFetchedData };
  //   });
  //   console.log(allFetchedData.length);
  // });

  fetchData(data[2].url).then((res) => console.log({ res }));

  return data;
};
