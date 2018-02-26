const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerSchema = new Schema({
    answer: String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    QuestionId : {
      type: Schema.Types.ObjectId,
      ref: 'question'
    },
    point: Number
  },{
    timestamps: true
  });
var answer = mongoose.model('answer', answerSchema);
module.exports = answer;