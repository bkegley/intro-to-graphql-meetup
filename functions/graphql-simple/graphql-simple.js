require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')

const schema = require('../sharedSchema.graphql')
const resolvers = require('../sharedResolvers')
const data = require('../data.json')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => ({
    data,
  }),
})

exports.handler = server.createHandler()
