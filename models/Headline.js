var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
        type: String, 
        required: true
  }, 
  link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});
var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;