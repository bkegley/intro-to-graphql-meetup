const merge = require('lodash.merge')
const sharedResolvers = require('../sharedResolvers')

const resolvers = {
  Query: {
    async getGuiltyPleasure(parent, args, {models}) {
      const {GuiltyPleasure} = models
      const guiltyPleasure = await GuiltyPleasure.findById(args.id)
      return guiltyPleasure
    },
    async listGuiltyPleasures(parent, args, {models}) {
      const {GuiltyPleasure} = models
      const guiltyPleasure = await GuiltyPleasure.find(args)
      return guiltyPleasure
    },
    async me(parent, args, {models, user}) {
      return user ? user : null
    },
  },

  Mutation: {
    async createGuiltyPleasure(parent, {input}, {models}) {
      const {GuiltyPleasure} = models
      const guiltyPleasure = await new GuiltyPleasure(input).save()
      return guiltyPleasure
    },
    async updateGuiltyPleasure(parent, {id, input}, {models}) {
      const {GuiltyPleasure} = models
      const guiltyPleasure = await GuiltyPleasure.findByIdAndUpdate(id, input, {
        new: true,
      })
      return guiltyPleasure
    },
    async deleteGuiltyPleasure(parent, {id}, {models}) {
      const {GuiltyPleasure} = models
      const guiltyPleasure = await GuiltyPleasure.findByIdAndDelete(id)
      return guiltyPleasure
    },
    async updateMe(parent, {input}, {models, user}) {
      if (!user) throw new Error('Who dis?')
      const {Person} = models
      const me = await Person.findByIdAndUpdate(user.id, input, {new: true})
      return me
    },
  },
  Person: {
    async guiltyPleasures(parent, args, {models, user}) {
      if (!user || parent.id !== user.id) return null
      const {GuiltyPleasure} = models
      const guiltyPleasures = await GuiltyPleasure.find({
        _id: parent.guiltyPleasures,
      })
      return guiltyPleasures
    },
  },
}

module.exports = merge(sharedResolvers, resolvers)
