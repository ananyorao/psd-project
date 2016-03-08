var jwt = require('jsonwebtoken');
module.exports = function (db, utils) {
    
  return {
    login: function(req,res) {
      var token = jwt.sign({ pass: req.body.secret }, 'ajsfasknfka');
      res.json(token);
    },

    me: function(req,res) {
      var token = req.headers.api_token;
      var decoded = jwt.verify(token, 'ajsfasknfka');
      res.json(decoded);
    }
  }
}
