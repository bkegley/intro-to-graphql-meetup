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
  Mutation: {
    async updatePersonsPokemon(parent, {id, input}, {models}) {
      const {Person} = models
      const person = await Person.findByIdAndUpdate(id, input, {new: true})
      return person
    },
  },
  Person: {
    async pokemon(parent, args, {models}) {
      const {Person} = models
      const person = await Person.findById(parent.id)
      const pokemons = person.pokemon
        ? person.pokemon.map(async pokemonId => {
            const pokemon = await P.getPokemonByName(pokemonId.toString())
              .then(res => res)
              .catch(err => err)
            return pokemon
          })
        : null
      return pokemons
    },
  },
}

module.exports = resolvers
