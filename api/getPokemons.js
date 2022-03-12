import pokedex from './index.js';

const getPokemons = async ({ offset = 0, limit = 50 } = {}) => {
  try {
    const pokemonSpeciesList = await pokedex.getPokemonSpeciesList({
      offset,
      limit,
    });
    const pokemons = await pokedex.getPokemonsList({
      offset,
      limit: pokemonSpeciesList.results.length,
    });

    const normalizedPokemons = await Promise.all(
      pokemons.results.map(async (pokemon) => {
        return await pokedex.getPokemonByName(pokemon.name);
      })
    );
    return {
      count: pokemonSpeciesList.count,
      results: normalizedPokemons,
    };
  } catch (error) {
    console.log('Erro:', error);
  }
};

export default getPokemons;
