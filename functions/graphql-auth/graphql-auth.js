require('graphql-import-node/register')
const {mergeSchemas} = require('graphql-tools')
const {ApolloServer} = require('apollo-server-lambda')
const data = require('../data.json')

const localSchema = require('./schema.graphql')
const sharedSchema = require('../sharedSchema.graphql')
const resolvers = require('../sharedResolvers')

exports.handler = async function(event, context) {
  const schemas = [localSchema, sharedSchema]

  const schema = mergeSchemas({schemas, resolvers})

  const server = new ApolloServer({
    schema,
    context: ({event}) => ({
      data,
      user:
        event.headers && event.headers.authorization
          ? data.persons.find(
              person => person.token === event.headers.authorization,
            )
          : null,
    }),
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
