const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: { type: String, required: true },
  developer: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  image: { type: String, required: false },
  publication_year: { type: Date },
  system: [{ type: Schema.Types.ObjectId, ref: "System" }],
});

// Virtual for book's URL
ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
