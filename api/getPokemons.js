import pokedex from './index.js';

const getPokemons = async ({ offset = 0, limit = 50 } = {}) => {
  try {
    const pagination = offset * limit;
    const pokemons = await pokedex.getPokemonSpeciesList({
      offset: pagination,
      limit,
    });
    return pokemons;
  } catch (error) {
    console.log('Erro:', error);
  }
};

export default getPokemons;
