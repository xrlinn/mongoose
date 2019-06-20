var mongoose = require("mongoose")
var book= new mongoose.Schema({
    title: String,
    author:String,
    reader:String
  });

var bookModel = mongoose.model('bookModel', book);
module.exports = bookModel