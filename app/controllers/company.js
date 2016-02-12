
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
              db.Company.find({'_id': cid}, function(err,data) {
                if(err) {
                  console.log(err);
                }
                callback(null, data);
              })
          },
          function(data,callback) {
            var companyName = data[0].name;
            db.Synopsis.find({'company' : companyName}, function(err,data) {
              callback(null, data);
            })
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
