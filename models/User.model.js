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
        'https://res.cloudinary.com/duuwrswcs/image/upload/v1671028553/iron-sports/userIcon_el2csm.png'
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorites' }],
    teams: [{ type: Schema.Types.ObjectId, ref: 'Teams' }],
    players: [{ type: Schema.Types.ObjectId, ref: 'Players' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;