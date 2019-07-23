require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')
const {buildFederatedSchema} = require('@apollo/federation')

// const schema = require('./schema.graphql')
const schema = require('./federatedSchema.graphql')
// const resolvers = require('./resolvers')
const resolvers = require('./federatedResolvers')
const data = require('../data.json')

exports.handler = async function(event, context) {
  // const server = new ApolloServer({
  //   typeDefs: schema,
  //   resolvers,
  //   context: () => ({
  //     data,
  //   }),
  // })

  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs: schema,
        resolvers,
      },
    ]),
    context: () => ({
      data,
    }),
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
