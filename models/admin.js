const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
});

// Export model
module.exports = mongoose.model("Admin", AdminSchema);
