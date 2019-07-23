require('dotenv').config()
require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')
const {createMongoConnection, models} = require('mongo')

const schema = require('../sharedSchema.graphql')
const resolvers = require('../sharedResolvers')

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
  // connect to cached or remote db
  context.callbackWaitsForEmptyEventLoop = false
  await connectToDatabase(process.env.MONGODB_CONNECTION)

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: () => ({
      models,
    }),
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
