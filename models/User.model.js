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
		googleId: String,
    picture_url: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8&w=1000&q=80'
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;