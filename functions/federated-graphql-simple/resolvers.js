const merge = require('lodash.merge')
const resolvers = require('./sharedResolvers')
const {models} = require('mongo')

const federatedResolvers = {
  Person: {
    async __resolveReference(parent) {
      const {Person} = models
      const person = await Person.findById(parent.id)
      return person
    },
  },
}

module.exports = merge(resolvers, federatedResolvers)
