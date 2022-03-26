import pokedex from './index.js';

const getPokemonDetails = async (id) => {
  try {
    const pokemonSpecies = await pokedex.getPokemonSpeciesByName(id);
    const { gender_rate, name, habitat } = pokemonSpecies;
    const varieties = pokemonSpecies.varieties.map(
      (variety) => variety.pokemon.name
    );
    const pokemonVariety = await pokedex.getPokemonByName(id);
    const abilities = pokemonVariety.abilities.map((slot) => ({
      name: slot.ability.name,
      is_hidden: slot.is_hidden,
    }));
    const forms = pokemonVariety.forms.map((form) => form.name);
    const type = pokemonVariety.types.map((slot) => slot.type.name);
    const { height, weight, sprites } = pokemonVariety;

    return {
      id,
      name,
      gender_rate,
      habitat: habitat?.name,
      varieties,
      abilities,
      forms,
      artwork: sprites.other['official-artwork'].front_default,
      height,
      weight,
      type,
    };
  } catch (error) {
    console.log('Erro:', error);
  }
};

export default getPokemonDetails;
