const merge = require('lodash.merge')
const resolvers = require('../sharedResolvers')

const federatedResolvers = {
  Person: {
    __resolveReference(parent, args, context) {
      console.log({context})
      return context.data.persons.find(person => person.id === parent.id)
    },
  },
}

module.exports = merge(resolvers, federatedResolvers)
