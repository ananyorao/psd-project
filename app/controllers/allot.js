
module.exports = function (db, utils) {
    
  return {
    save: function(req,res) {
      var allot = require('../data/allot');
      db.Allot.collection.insert(allot, function (err, data) {
        if(err) {
          console.log(err);
        }
        res.json(data.length);
      })
    }
  }
}
