const appObjectList = {
  'Candy App': {
    icon: 'https://cdn4.iconfinder.com/data/icons/christmas-spirit-2/32/candy-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: 'candyapp' */ '../candyapp'),
  },

  'Ice Cream App': {
    icon: 'https://cdn2.iconfinder.com/data/icons/food-184/512/icecream_candy_food-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: 'icecreamapp' */ '../icecreamapp'),
  },

  'Lollipop App': {
    icon: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Candy-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: 'lollipopapp' */ '../lollipopapp'),
  },
};

const appArrayList = Object.keys(appObjectList).map(key => ({
  ...appObjectList[key],
  name: key,
}));

const defaultApp = {
  icon: 'https://cdn3.iconfinder.com/data/icons/animal-emoji/50/Sloth-256.png',
  bundle: async () =>
    await import(/* webpackChunkName: 'defaultapp' */ '../defaultapp'),
};

// const remoteApp = {
//   icon: 'https://cdn2.iconfinder.com/data/icons/scenarium-vol-1-2/128/016_cloud_connections_export_backup_network_sharing-256.png',
//   bundle: async () =>
//     await import(/* webpackChunkName: 'remoteapp' */ '../remoteapp'),
//   remoteChunkId: 'remoteapp',
// };

export {appObjectList, appArrayList, defaultApp};
