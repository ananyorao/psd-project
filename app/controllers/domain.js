
module.exports = function (db, utils) {
    
  /********
   * DOMAIN *
   ********/
  return {
    list: function (req, res) {
    var domains = require('../dummy/domains');
    res.json(domains);
    },

    listbydomain: function (req, res) {
    var companies = require('../dummy/companyByDomain');
    res.json(companies);
    }
  }
}
