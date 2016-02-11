module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var synopsisSchema = new Schema({
    broadarea: { type: String, default:'' },
    domain: { type: String, default:'' },
    email: { type: String, default:'' },
    idno: { type: String, default:'' },
    name: { type: String, default:'' },
    objective: { type: String, default:'' },
    project_title: { type: String, default:'' },
    sub_area: { type: String, default:'' },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('synopsis', synopsisSchema)
}
