
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
          function(data,callback) {
            var companyName = data[0].name;
            db.Synopsis.find({'company' : companyName}).lean().exec(function(err,data) {
              callback(null, data);
            });
          },
          function(data,callback) {
            var newsletterIndex = [];
            var _ = require('underscore');
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
                } else {
                  synopsis.newsletter = "";
                }
              }
                return synopsis;
              }).value();
              console.log(synopsisWithNewsletter);
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
