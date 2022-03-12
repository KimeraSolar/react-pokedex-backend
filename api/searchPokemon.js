import pokedex from './index.js';

const searchPokemon = async (pokemon) => {
  try {
    const pokemons = await pokedex.getPokemonSpeciesList();
    const matchingPokemons = pokemons.results.filter((result) =>
      result.name.includes(pokemon)
    );
    return matchingPokemons;
  } catch (error) {
    console.log('Error:', error);
  }
};

export default searchPokemon;
