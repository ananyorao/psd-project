module.exports = function (app, http, db) {
  var path = require('path');
  var utils = require('../app/lib/utils')(db)
  
  function route(name, other) {
    return require('../app/controllers/'+name)(db, utils, other)
  }
  
  var u = route('users')

  var d = route('domain')

  var c = route('company')
  

  //domain
  app.get('/domains', d.list)
  app.get('/domain/:did', d.listbydomain) 

  //company
  app.get('/company/:cid', c.show)
  app.post('/company/save', c.save)
  app.post('/company/search', c.search)
  app.get('/companies', c.showall)

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