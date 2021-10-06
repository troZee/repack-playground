const appObjectList = {
  'Candy App': {
    icon: 'https://cdn4.iconfinder.com/data/icons/christmas-spirit-2/32/candy-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: candyapp */ '../candyapp'),
  },

  'Ice Cream App': {
    icon: 'https://cdn2.iconfinder.com/data/icons/food-184/512/icecream_candy_food-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: icecreamapp */ '../icecreamapp'),
  },

  'Lollipop App': {
    icon: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Candy-256.png',
    bundle: async () =>
      await import(/* webpackChunkName: lollipopapp */ '../lollipopapp'),
  },
};

const appArrayList = Object.keys(appObjectList).map(key => ({
  ...appObjectList[key],
  name: key,
}));

export {appObjectList, appArrayList};
