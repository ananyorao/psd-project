module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var companySchema = new Schema({
    name: { type: String, default:'' },
    domain: { type: String, default:'' },
    stipend: { type: String, default:'' },
    editable: { type: String, default:'' },
    viewCount: { type : Number , default : 0 },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('company', companySchema)
}
