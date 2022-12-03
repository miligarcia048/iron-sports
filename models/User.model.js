const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      //required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
     // required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        'Please provide a valid email.'
      ]
    },
    passwordHash: {
      type: String,
     // required: [true, 'Password is required.']
    },
		googleId: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;