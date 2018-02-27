const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    title: String,
    question: String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    point: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },{
    timestamps: true
  });
var question = mongoose.model('question', questionSchema);
module.exports = question;