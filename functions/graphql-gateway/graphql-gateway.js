const {ApolloServer} = require('apollo-server-lambda')
const {ApolloGateway} = require('@apollo/gateway')

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'persons',
      url: `${process.env.URL}/.netlify/functions/federated-graphql-simple`,
    },
    {
      name: 'pokemon',
      url: `${process.env.URL}/.netlify/functions/federated-graphql-pokemon`,
    },
  ],
})

exports.handler = async function(event, context) {
  const {schema, executor} = await gateway.load()

  const server = new ApolloServer({
    schema,
    executor,
    playground: true,
    introspection: true,
  })

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
