
module.exports = function (db, utils) {
    
  return {
    save: function(req,res) {
      var synopsis = require('../data/synopsis');
      db.Synopsis.collection.insert(synopsis, function (err, data) {
        if(err) {
          console.log(err);
        }
        res.json(data.length);
      })
    }
  }
}
