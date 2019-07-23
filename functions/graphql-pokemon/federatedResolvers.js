const merge = require('lodash.merge')
const resolvers = require('./resolvers')
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

const federatedResolvers = {
  Person: {
    async pokemon(parent) {
      const pokemon = await P.getPokemonByName(parent.id)
        .then(res => res)
        .catch(err => err)
      return pokemon
    },
  },
}

module.exports = merge(resolvers, federatedResolvers)
