require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')

const schema = require('./schema.graphql')
const resolvers = require('./resolvers')
const data = require('../data.json')

exports.handler = async function(event, context) {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: () => ({
      data,
    }),
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
