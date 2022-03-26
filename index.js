import express from 'express';
import cors from 'cors';
import api from './api.js';

const app = express();
const port = 3003;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use(cors());

//Get all pokemons
app.get('/get-pokemons', async (req, res) => {
  try {
    const result = await api.getPokemons(req.query);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({});
  }
});

//Search pokemon
app.get('/search-pokemon', async (req, res) => {
  try {
    const { pokemon, offset, limit } = req.query;
    if (!pokemon) throw new Error('Pokémon name or id must be passed.');
    const result = await api.searchPokemon(
      pokemon,
      parseInt(offset),
      parseInt(limit)
    );
    if (result.count) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({});
  }
});

//Get pokemon details
app.get('/get-pokemon-details', async (req, res) => {
  try {
    const { id } = req.query;
    if (!parseInt(id)) throw new Error('Pokémon id must be passed.');
    const result = await api.getPokemonDetails(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({});
  }
});
