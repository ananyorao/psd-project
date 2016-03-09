var jwt = require('jsonwebtoken');
module.exports = function (db, utils) {
    
  return {
    login: function(req,res) {
      var sanitizer = require('sanitizer');
      if(typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        return utils.error(res, 403, 'Invalid Login')
      }
      var email = sanitizer.sanitize(req.body.email);
      var password = sanitizer.sanitize(req.body.password);
      db.Faculty.find({ 'EmailId1' : email}).lean().exec(function (err, faculty) {
        if(err) {
          console.log(err);
          return;
        }
        if(faculty.length === 0) {
          return utils.error(res, 401, 'Unauthorised Login Attempt')
        }
        if(faculty[0].PSRNNo === password) {
          var token = jwt.sign({ emailId: email, pass: password }, 'ajsfasknfka');
          res.setHeader('Set-Cookie','api_token='+token);
          res.cookie('api_token', token, { maxAge: 900000, httpOnly: false});
          res.json(token);
        } else {
          return utils.error(res, 401, 'Unauthorised Login Attempt')
        }
      });
    },

    me: function(req,res) {
      var token = req.cookies.api_token;
      var decoded = jwt.verify(token, 'ajsfasknfka');
      res.json(decoded);
    }
  }
}
