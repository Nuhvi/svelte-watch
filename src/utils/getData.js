import Store from 'store';
import fetchStats from './api';

const updateStorage = ({ data, updatedAt }) => {
  Store.set('data', data);
  Store.set('updatedAt', updatedAt);
};

const daysAgo = (days = 0) => {
  const date = new Date();
  return date.setDate(date.getDate() - days);
};

const getData = async () => {
  let stats = {};

  const storageUpdatedAt = Store.get('updatedAt');

  if (storageUpdatedAt && date(storageUpdatedAt) > daysAgo(7)) {
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
