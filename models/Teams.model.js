const { Schema, model } = require('mongoose');

const teamsSchema = new Schema(
    {
        name: String,
        flag: String
    },
    { 
        timestamps: true 
    }
  );

const Teams = model('Teams', teamsSchema);

module.exports = Teams;