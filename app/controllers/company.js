
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
      var project = require('../dummy/project');
      res.json(project);
    },

    showall: function(req,res) {
      var companies = require('../dummy/allcompany');
      res.json(companies);
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
