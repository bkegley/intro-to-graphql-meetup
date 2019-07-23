const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SkillSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ['work', 'personal', 'misc'],
    },
  },
  {timestamps: true},
)

module.exports = mongoose.model('skill', SkillSchema)
