let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  products:[String]
});

module.exports = mongoose.model("category", categorySchema);
