module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var companySchema = new Schema({
    cid: {type: Number, required:true },
    did: {type:Number, required:true},
    domain: { type: String, required: true },
    subdomain: { type: String, default:'' },
    name: { type: String, required: true },
    year: { type: String, required: true },
    viewCount: { type : Number , default : 0 },
    semester: { type: String, required: true },
    projects: { type : Array , default : [] },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('company', companySchema)
}
