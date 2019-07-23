const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: 'skill',
      },
    ],
    guiltyPleasures: [
      {
        type: Schema.Types.ObjectId,
        ref: 'guiltyPleasure',
      },
    ],
    pokemon: [{type: String}],
  },
  {timestamps: true},
)

module.exports = mongoose.model('person', PersonSchema)
