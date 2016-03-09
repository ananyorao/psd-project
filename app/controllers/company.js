
module.exports = function (db, utils) {
    
  /********
   *COMPANY *
   ********/
  return {
    listAll: function (req, res) {
    db.Company.find({ }, function (err, companies) {
      if(err) {
        console.log(err)
      }
      res.json(companies || [])
    })
    },

    list: function (req, res) {
    var cid = req.params.cid;
    db.Company.find({ _id : cid}, function (err, companies) {
      if(err) {
        console.log(err)
      }
      res.json(companies || [])
    })
    },

    saveAll: function(req,res) {
      var companies = require('../data/companies');
      db.Company.collection.insert(companies, function (err, data) {
        if(err) {
          console.log(err);
        }
        res.json(data);
      })
    },

    show: function(req,res) {
      var async = require('async');
      var _ = require('underscore');
      async.waterfall([
          function(callback) {
            var cid = req.params.cid;
              db.Company.find({'_id': cid}).lean().exec(function(err,data) {
                if(err) {
                  console.log(err);
                  res.status(404).json({ error:'Invalid GET request' });
                  return;
                }
                callback(null, data);
              });
          },
          function(data, callback) {
            console.log(data);
            var id = data[0]._id;
            var count = data[0].viewCount;
            if(typeof count === 'undefined') {
              count = 0;
            }
            db.Company.update({_id: id}, {viewCount:count+1}, function(err,affected){
              if(err) {
                console.log(err);
                return;
              }
              callback(null, data);
            });
          },
          function(data,callback) {
            var companyName = data[0].name;
            db.Synopsis.find({'company' : companyName}).lean().exec(function(err,data) {
              _(data).chain().flatten().map(function(synopsis) {
                synopsis.newsletter = "";
              });
              callback(null, data);
            });
          },
          function(data,callback) {
            var newsletterIndex = [];
            var ids = _(data).chain().flatten().pluck('idno').unique().value();
            
            db.Newsletter.find({id: {$in: ids}}).lean().exec(function(err,newsletters) {
              if(err) {
                console.log(err);
                return;
              }
              var synopsisWithNewsletter = _(data).chain().flatten().map(function(synopsis) {
              var id = synopsis.idno;
              for(i=0; i< newsletters.length; i++) {
                var idFromNewsletter = newsletters[i].id;
                if(idFromNewsletter.indexOf(synopsis.idno) != -1) {
                  synopsis.newsletter = newsletters[i].feedback;
                }
              }
                return synopsis;
              }).value();
              callback(null,synopsisWithNewsletter);
            });
          }
        ], function(err, result) {
          if(err) {
            console.log(err);
          }
          res.json(result || []);
        });
    },

    edit: function(req,res) {
      var jwt = require('jsonwebtoken');
      var sanitizer = require('sanitizer');
      if(typeof req.cookies.api_token === "undefined") {
        utils.error(res, 401, 'Invalid api_token, please login!');
        return;
      }
      var token = req.cookies.api_token;
      var decoded = jwt.verify(token, 'ajsfasknfka');
      db.Faculty.find({ 'EmailId1' : decoded.emailId}).lean().exec(function (err, faculty) {
        if(err) {
          console.log(err);
          return utils.error(res, 401, 'Error');
        }
        if(faculty.length === 0) {
          return utils.error(res, 401, 'Unauthorised Attempt')
        }
        if(faculty[0].PSRNNo === decoded.pass) {
          var cid = req.body.cid;
          var content = {};
          content.coreBusiness = sanitizer.sanitize(sanitizer.escape(req.body.content.coreBusiness));
          content.projectNature = sanitizer.sanitize(sanitizer.escape(req.body.content.projectNature));
          content.companyAddress = sanitizer.sanitize(sanitizer.escape(req.body.content.companyAddress));
          content.who = decoded;
          db.Company.update({_id: cid}, {editable:JSON.stringify(content)}, function(err,affected){
            if(err) {
              console.log(err);
              return;
            }
            db.Company.find({_id: cid}, function(err,resp){
              if(err) {
                console.log(err);
                return;
              }
              res.json(resp || []);
            }); 
          });  
        } else {
          return utils.error(res, 401, 'Unauthorised Attempt')
        }
      });
    },

    save: function(req,res) {
      new db.Company(req.body).save(function (err, company) {
        if(err) {
          console.log(err);
        }
        res.json(company);
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
