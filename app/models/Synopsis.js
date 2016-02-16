module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var synopsisSchema = new Schema({
    broadArea: { type: String, default:'' },
    domain: { type: String, default:'' },
    email: { type: String, default:'' },
    idno: { type: String, default:'' },
    name: { type: String, default:'' },
    objective: { type: String, default:'' },
    projectTitle: { type: String, default:'' },
    subArea: { type: String, default:'' },
    natureOfWork: { type: String, default:'' },
    summary: { type: String, default:'' },
    projectContribution: { type: String, default:'' },
    futureScope: { type: String, default:'' },
    company: { type: String, required: true },
    viewCount: { type : Number , default : 0 },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('synopsis', synopsisSchema)
}
