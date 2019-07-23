require('dotenv').config()
require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')
const {mergeSchemas} = require('graphql-tools')
const {createMongoConnection, models} = require('mongo')

const sharedSchema = require('../sharedSchema.graphql')
const localSchema = require('./schema.graphql')
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
  // connect to cached or remote db
  context.callbackWaitsForEmptyEventLoop = false
  await connectToDatabase(process.env.MONGODB_CONNECTION)

  const schemas = [localSchema, sharedSchema]
  const schema = mergeSchemas({schemas, resolvers})

  const server = new ApolloServer({
    schema,
    context: async ({event}) => {
      let user = null
      try {
        user = await models.Person.findById(event.headers.authorization)
      } catch (err) {
        err
      }
      return {
        models,
        user,
      }
    },
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
