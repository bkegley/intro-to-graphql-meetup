const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuiltyPleasureSchema = new Schema(
  {
    name: {
      type: String,
    },
    shameLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
  },
  {timestamps: true},
)

module.exports = mongoose.model('guiltyPleasure', GuiltyPleasureSchema)
