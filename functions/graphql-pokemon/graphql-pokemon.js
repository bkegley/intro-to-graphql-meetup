require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')
const schema = require('./schema.graphql')
const resolvers = require('./resolvers')

exports.handler = async function(event, context) {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
