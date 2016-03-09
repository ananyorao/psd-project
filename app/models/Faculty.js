module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var facultySchema = new Schema({}, { collection : 'faculty' });

  
  return mongoose.model('faculty', facultySchema)
}
