import pokedex from './index.js';

const searchPokemon = async (pokemon, offset = 0, limit = 30) => {
  try {
    const pokemons = await pokedex.getPokemonSpeciesList();
    const matchingPokemons = pokemons.results.filter((result) =>
      result.name.includes(pokemon)
    );
    const trimmedMatchingPokemons = matchingPokemons.slice(
      offset,
      offset + limit
    );
    const normalizedPokemons = await Promise.all(
      trimmedMatchingPokemons.map(async (pokemon) => {
        const pokemonSpecies = await pokedex.getPokemonSpeciesByName(
          pokemon.name
        );
        return await pokedex.getPokemonByName(pokemonSpecies.id);
      })
    );
    return {
      count: matchingPokemons.length,
      results: normalizedPokemons,
    };
  } catch (error) {
    console.log('Error:', error);
  }
};

export default searchPokemon;
