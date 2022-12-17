const { Schema, model } = require("mongoose");

const playersSchema = new Schema(
  {
    id: String,
    name: String,
    flag: String,
  },
  {
    timestamps: true,
  }
);

const Players = model("Players", playersSchema);

module.exports = Players;
