const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["PC", "Xbox Series X/S", "PS5"],
    default: "Maintenance",
    maxLength: 100,
    minLength: 3,
  },
});

// Virtual for Console's URL
ConsoleSchema.virtual("url").get(function () {
  return `/catalog/console/${this._id}`;
});

// Export model
module.exports = mongoose.model("Console", ConsoleSchema);
