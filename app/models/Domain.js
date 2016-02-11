module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var domainSchema = new Schema({
    did: {type:Number, required:true},
    name: { type: String, required: true },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('domain', domainSchema)
}
