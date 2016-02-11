module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var newsletterSchema = new Schema({
    domain: { type: String, default:'' },
    company: { type: String, default:'' },
    name: { type: String, default:'' },
    id: { type: String, default:'' },
    feedback: { type: String, default:'' },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('newsletter', newsletterSchema)
}
