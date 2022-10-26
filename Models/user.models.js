const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please fill the username'],
    },
    email: {
        type: String,
        required: [true, 'please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'pleade fill valid email'],
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    password: {
        type: String,
        required: [true, 'please create your password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please fill confirm password correctly'],
        validate: {
          validator(el) {
            return el === this.password;
          },
          messgae: 'password confirm not match!!',
        },
      },
});

userSchema.pre('save', async function (next) {

  // if(!this.isModified('password')) return next();

  // hashing password sebelum di simpan
  this.password = await bcrypt.hash(this.password, 12);

  // hapus/kosongkan passwordConfirm
  this.passwordConfirm = undefined;

  next();
});

// method untuk compare real password dengan input password
userSchema.methods.correctPassword = async (inputPassword, realPassword) => {
  return await bcrypt.compare(inputPassword, realPassword);
}

module.exports = mongoose.model('user', userSchema);

