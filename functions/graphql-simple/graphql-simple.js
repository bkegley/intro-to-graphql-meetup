require('graphql-import-node/register')
const {ApolloServer} = require('apollo-server-lambda')

const schema = require('./schema.graphql')

const persons = [
  {
    id: 1,
    firstName: 'Jack',
    lastName: 'Johnson',
    email: 'jack@johnson.com',
    pets: [1],
  },
  {
    id: 2,
    firstName: 'Jack',
    lastName: 'Sparrow',
    email: 'jack@blackpearl.net',
    pets: [2, 3],
  },
]

const pets = [
  {id: 1, name: 'Jacky Boy', type: 'dog'},
  {id: 2, name: 'Whiskers', type: 'cat'},
  {id: 3, name: 'Speedy', type: 'turtle'},
]

const resolvers = {
  Query: {
    getPerson(parent, args, context, info) {
      return persons.find(person => person.id === args.id)
    },
    listPersons(parent, args, context, info) {
      return persons
    },
  },
  Person: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`
    },
    pets: parent => {
      return pets.filter(pet => parent.pets.includes(pet.id))
    },
  },
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

exports.handler = server.createHandler()
