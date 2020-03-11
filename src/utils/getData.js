import Store from 'store';
import fetchStats from './api';

const updateStorage = ({ data, updatedAt }) => {
  Store.set('data', data);
  Store.set('updatedAt', updatedAt);
};

const isRecentThanDaysAgo = (date, days = 0) => {
  const givenData = new Date(date);
  console.log({ givenData: givenData, days });
  return new Date(date) > new Date().getTime() - days * 86400000;
};

const getData = async () => {
  let stats = {};

  const storageUpdatedAt = Store.get('updatedAt');

  if (storageUpdatedAt && isRecentThanDaysAgo(storageUpdatedAt, 7)) {
    const data = Store.get('data');
    stats = { data, updatedAt: storageUpdatedAt };
  } else {
    stats = await fetchStats();
    updateStorage(stats);
  }

  return stats;
};

export default () =>
  getData().catch((Error) => {
    console.error({ Error });
    return false;
  });
