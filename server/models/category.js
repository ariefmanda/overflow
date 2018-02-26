const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    name:String
  },{
    timestamps: true
  });
var category = mongoose.model('category', categorySchema);
module.exports = category;