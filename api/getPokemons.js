import pokedex from './index.js';

const getPokemons = async ({ offset = 0, limit = 50 } = {}) => {
  try {
    const pokemons = await pokedex.getPokemonSpeciesList({
      offset,
      limit,
    });
    const normalizedPokemons = await Promise.all(
      pokemons.results.map(async (pokemon) => {
        const pokemonSpecies = await pokedex.getPokemonSpeciesByName(
          pokemon.name
        );
        return await pokedex.getPokemonByName(pokemonSpecies.id);
      })
    );
    return {
      count: pokemons.count,
      results: normalizedPokemons,
    };
  } catch (error) {
    console.log('Erro:', error);
  }
};

export default getPokemons;
