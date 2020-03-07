import jsonLibraries from '../data/libraries.json';
import Store from 'store';
import updateStats from './updateStats';

const updateStorage = (data, lastUpdate) => {
  Store.set('data', data);
  Store.set('lastUpdate', lastUpdate);
};

const date = (str) => new Date(str);

const daysAgo = (days) => {
  const date = new Date();
  return date.setDate(date.getDate() - days);
};

const getData = async () => {
  let data = jsonLibraries.data;
  let lastUpdate = jsonLibraries.lastUpdate;

  // substitute libraries from JSON with the local storage
  const storageLastUpdate = Store.get('lastUpdate');
  if (storageLastUpdate && date(storageLastUpdate) > date(lastUpdate)) {
    data = Store.get('data');
    lastUpdate = Store.get('lastUpdate');
  } else {
    updateStorage(data, jsonLibraries.lastUpdate);
  }

  // if (date(lastUpdate) < daysAgo(7))
  data = updateStats(data);

  return data;
};

export default () =>
  getData().catch((Error) => {
    console.error({ Error });
    return false;
  });
