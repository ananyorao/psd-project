
module.exports = function (db, utils) {
    
  return {
    save: function(req,res) {
      var newsletter = require('../data/newsletter');
      db.Newsletter.collection.insert(newsletter, function (err, data) {
        if(err) {
          console.log(err);
        }
        res.json(data.length);
      })
    }
  }
}
