const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

const resolvers = {
  Query: {
    async getPokemon(parent, args) {
      const pokemon = await P.getPokemonByName(args.id)
        .then(res => res)
        .catch(err => err)
      return pokemon
    },
    async listPokemons(parent, args) {
      const {limit = 10, offset = 0} = args
      const pokemonConnection = await P.getPokemonsList({limit, offset})
        .then(res => res)
        .catch(err => err)
      const pokemons = pokemonConnection.results.map(
        async pokemon => await P.getPokemonByName(pokemon.name),
      )
      return {
        ...pokemonConnection,
        results: pokemons,
      }
    },
  },
}

module.exports = resolvers
