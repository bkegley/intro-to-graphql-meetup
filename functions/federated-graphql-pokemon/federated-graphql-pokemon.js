require('dotenv').config()
require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')
const {buildFederatedSchema} = require('@apollo/federation')
const {createMongoConnection, models} = require('mongo')

const schema = require('./schema.graphql')
const resolvers = require('./resolvers')

let cachedDb

async function connectToDatabase(uri) {
  if (cachedDb) {
    return Promise.resolve(cachedDb)
  }

  const connection = await createMongoConnection(uri)
  cachedDb = connection
  return cachedDb
}

exports.handler = async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false
  await connectToDatabase(process.env.MONGODB_CONNECTION)

  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs: schema,
        resolvers,
      },
    ]),
    context: () => ({
      models,
    }),
    playground: true,
    introspection: true,
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
