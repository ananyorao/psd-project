
module.exports = function (db, utils) {
    
  /********
   * DOMAIN *
   ********/
  return {
    list: function (req, res) {
    db.Domain.find({}, function (err, domains) {
      if(err) {
        console.log(err);
        return;
      }
      res.json(domains || [])
    })
    },

    save: function (req, res) {
    new db.Domain(req.body).save(function (err, company) {
        if(err) {
          console.log(err);
        }
        res.json(company);
      })
    },

    listbydomain: function (req, res) {
    var companies = require('../dummy/companyByDomain');
    res.json(companies);
    }
  }
}
