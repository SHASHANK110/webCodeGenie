let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Product', productSchema);
