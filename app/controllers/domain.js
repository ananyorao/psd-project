
module.exports = function (db, utils) {
    
  /********
   * DOMAIN *
   ********/
  return {
    list: function (req, res) {
    var domains = require('../dummy/domains');
    console.log(domains);
    res.json(domains);
    },

    listbydomain: function (req, res) {
    var domains = require('../dummy/domains');
    console.log(domains);
    res.json(domains);
    }
  }
}
