
module.exports = function (db, utils) {
    
  /********
   * DOMAIN *
   ********/
  return {
    list: function (req, res) {
    var domains = require('../data/domains');
    res.json(domains);
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
    var domainName = req.params.dname;
    console.log(domainName);
    db.Company.find({ 'domain' : domainName }, function (err, users) {
      if(err) {
        console.log(err);
      }
      res.json(users || [])
    })
    }
  }
}
