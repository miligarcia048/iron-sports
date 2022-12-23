const { Schema, model } = require("mongoose");

const teamsSchema = new Schema(
  {
    id: Number,
    name: String,
    flag: String,
  },
  {
    timestamps: true,
  }
);

const Teams = model("Teams", teamsSchema);

module.exports = Teams;
