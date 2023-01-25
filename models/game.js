const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  developer: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  publication_year: { type: Number },
  system: [{ type: Schema.Types.ObjectId, ref: "System" }],
});

// Virtual for book's URL
GameSchema.virtual("url").get(function () {
  return `/catalog/game/${this._id}`;
});

// Export model
module.exports = mongoose.model("Games", GameSchema);
