const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Role-Playing", "First Person Shooter"],
    default: "Maintenance",
    maxLength: 100,
    minLength: 3,
  },
});

// Virtual for Genre's URL
GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);
