module.exports = function (mongoose, config) {

  var Schema   = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , fs = require('fs')
  
  var allotSchema = new Schema({
    IDNumber: { type: String, default:'' },
    StudentName: { type: String, default:'' },
    CGPA: { type: String, default:'' },
    Phone1: { type: String, default:'' },
    Phone2: { type: String, default:'' },
    StationName: { type: String, default:'' },
    StationDomain: { type: String, default:'' },
    Faculty: { type: String, default:'' },
    PreferenceNo: { type: String, default:'' },
    Stipend: { type: String, default:'' },
    created: { type: Date, default:Date.now }
  }, { versionKey:false })

  
  return mongoose.model('allot', allotSchema)
}
