const formatDate = require('date-fns/format')
const resolvers = {
  Query: {
    async getPerson(parent, args, {models}) {
      const {Person} = models
      const person = await Person.findById(args.id)
      return person
    },
    async listPersons(parent, args, {models}) {
      const {Person} = models
      const persons = await Person.find(args)
      return persons
    },
    async getSkill(parent, args, {models}) {
      const {Skill} = models
      const skill = await Skill.findById(args.id)
      return skill
    },
    async listSkills(parent, args, {models}) {
      const {Skill} = models
      const skills = await Skill.find(args)
      return skills
    },
  },
  Mutation: {
    async createPerson(parent, {input}, {models}) {
      const {Person} = models
      const person = await new Person(input).save()
      return person
    },
    async updatePerson(parent, {id, input}, {models}) {
      const {Person} = models
      const person = await Person.findByIdAndUpdate(id, input, {new: true})
      return person
    },
    async deletePerson(parent, {id}, {models}) {
      const {Person} = models
      const person = await Person.findByIdAndDelete(id)
      return person
    },

    async createSkill(parent, {input}, {models}) {
      const {Skill} = models
      const skill = await new Skill(input).save()
      return skill
    },
    async updateSkill(parent, {id, input}, {models}) {
      const {Skill} = models
      const skill = await Skill.findByIdAndUpdate(id, input, {new: true})
      return skill
    },
    async deleteSkill(parent, {id}, {models}) {
      const {Skill} = models
      const skill = await Skill.findByIdAndDelete(id)
      return skill
    },
  },
  Person: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`
    },
    skills: async (parent, args, {models}) => {
      const {Skill} = models
      const skills = await Skill.find({_id: parent.skills})
      return skills
    },
    createdAt: (parent, {format}) => {
      let date = parent.createdAt
      if (!format) return date
      try {
        date = formatDate(date, format)
      } catch (err) {
        throw new Error(err)
      }
      return date
    },
    updatedAt: (parent, {format}) => {
      let date = parent.updatedAt
      if (!format) return date
      try {
        date = formatDate(date, format)
      } catch (err) {
        throw new Error(err)
      }
      return date
    },
  },
}

module.exports = resolvers
