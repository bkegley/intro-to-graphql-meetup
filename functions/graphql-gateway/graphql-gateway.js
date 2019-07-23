const {ApolloServer} = require('apollo-server-lambda')
const {ApolloGateway} = require('@apollo/gateway')

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'persons',
      url: `${process.env.URL}/.netlify/functions/graphql-simple`,
    },
    {
      name: 'pokemon',
      url: `${process.env.URL}/.netlify/functions/graphql-pokemon`,
    },
  ],
})

exports.handler = async function(event, context) {
  const {schema, executor} = await gateway.load()

  const server = new ApolloServer({schema, executor})

  return new Promise((resolve, reject) => {
    const callback = (err, args) => (err ? reject(err) : resolve(args))
    server.createHandler()(event, context, callback)
  })
}
