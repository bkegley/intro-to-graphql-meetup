const resolvers = {
  Query: {
    getPerson(parent, args, context, info) {
      return context.data.persons.find(person => person.id === args.id)
    },
    listPersons(parent, args, context, info) {
      return context.data.persons
    },
  },
  Person: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`
    },
    pets: (parent, args, context) => {
      return context.data.pets.filter(pet => parent.pets.includes(pet.id))
    },
  },
}

module.exports = resolvers
