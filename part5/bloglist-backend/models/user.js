const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: String,
  date: Date,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.passwordHash
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', userSchema)
