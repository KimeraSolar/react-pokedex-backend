import Pokedex from 'pokedex-promise-v2';

const options = {
  protocol: 'https',
  cacheLimit: 100 * 1000,
  timeout: 5 * 1000,
};

export default new Pokedex(options);
