const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema(
    {
        name: String,
        flag: String
    },
    { 
        timestamps: true 
    }
  );

const Favorites = model('Favorites', favoritesSchema);

module.exports = Favorites;