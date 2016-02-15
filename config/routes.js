module.exports = function (app, http, db) {
  var path = require('path');
  var utils = require('../app/lib/utils')(db)
  
  function route(name, other) {
    return require('../app/controllers/'+name)(db, utils, other)
  }
  
  var u = route('users')

  var d = route('domain')

  var c = route('company')

  var n = route('newsletter');

  var s = route('synopsis');

  var a = route('allot');
  

  //domain
  app.get('/domains', d.list) //List all the domains from the file
  app.get('/domain/list/:dname', d.listbydomain)  //list by domain

  //company
  app.get('/companies', c.listAll) //List all the companies frolm the db
  app.get('/company/saveAll', c.saveAll) //Batch save all companies
  app.get('/company/get/:cid', c.list) //get company by id
  app.post('/company/save', c.save)
  app.post('/company/search', c.search)
  app.get('/company/list/:cid', c.show) //projects of a companyu
  app.post('/company/edit/:cid', c.edit) //update editable of a company

  //newsletter
  app.get('/newsletter/saveall', n.save) //Batch save all the newsletter

  //synopsis
  app.get('/synopsis/saveall',s.save) //Batch save all the synopsis data

  //allotment
  app.get('/allot/saveall',a.save) //Batch save all the allotment data

  app.get('/', function(req, res) {
    res.sendfile(path.resolve('views/index.html')); 
  });

  app.get('/domain.html', function(req, res) {
    res.sendfile(path.resolve('views/domain.html')); 
  });

  app.get('/domainDetail.html', function(req, res) {
    res.sendfile(path.resolve('views/domainDetail.html')); 
  });

  app.get('/companyDetail.html', function(req, res) {
    res.sendfile(path.resolve('views/companyDetail.html')); 
  });

  app.get('/companyEdit.html', function(req, res) {
    res.sendfile(path.resolve('views/companyEdit.html')); 
  });

  app.get('/faculty.html', function(req, res) {
    res.sendfile(path.resolve('views/faculty.html')); 
  });

  app.get('/css/*', function(req, res) {
    res.sendfile(path.resolve('views/style.css')); 
  });

  app.get('/js/*', function(req, res) {
    res.sendfile(path.resolve('views/bundle.js')); 
  });

  // catch-all
  app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' }) })
  app.post('*', function (req, res) { res.status(404).json({ error:'Invalid POST request' }) })
  app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' }) })
}