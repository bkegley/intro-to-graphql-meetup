const mongoose = require('mongoose')

const createMongoConnection = uri => {
  mongoose.set('useFindAndModify', false)
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(
      db => db,
      err => {
        console.log(`Mongodb connection error: \n${err}`)
      },
    )
}

module.exports = createMongoConnection
