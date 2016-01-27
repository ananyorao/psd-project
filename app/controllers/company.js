
module.exports = function (db, utils) {
    
  /********
   *COMPANY *
   ********/
  return {
    list: function (req, res) {
    var company = require('../dummy/company');
    res.json(company);
    },

    show: function(req,res) {
      var company = require('../dummy/company');
      res.json(company);
    },

    save: function(req,res) {
      new db.Company(req.body).save(function (err, user) {
        if(err) {
          console.log(err);
        }
        res.json(user);
      })
    },

    search: function (req, res) {
    db.Company.find({ 'name': {'$regex': new RegExp("^" + req.body.name.toLowerCase(), "i")}}, function (err, company) {
      if(err) {
        console.log(err)
      }
      res.json(company || [])
    })
    }
  }
}
