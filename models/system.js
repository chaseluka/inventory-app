const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 3,
  },
});

// Virtual for System's URL
SystemSchema.virtual("url").get(function () {
  return `/catalog/system/${this._id}`;
});

// Export model
module.exports = mongoose.model("System", SystemSchema);
