const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  
  accountType: {
    type: String,
    enum : [
      'Admin',
      'Employee',
    ],
    defaultValue: 'Employee',
    required: true
  },
  name: {
    type: String,
    require: true
  },
  surname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)