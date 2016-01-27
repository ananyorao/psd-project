module.exports = function (app, http, db) {
  
  var utils = require('../app/lib/utils')(db)
  
  function route(name, other) {
    return require('../app/controllers/'+name)(db, utils, other)
  }
  
  var u = route('users')

  var d = route('domain')

  var c = route('company')
  

  //domain
  app.get('/domains', d.list) 

  //company list
  app.get('/company/:cid', c.show)
  app.post('/company/save', c.save)
  app.post('/company/search', c.search)

  //company by domain
  app.get('/:did/company', d.listbydomain)

  // catch-all
  app.get('*', function (req, res) { res.status(404).json({ error:'Invalid GET request' }) })
  app.post('*', function (req, res) { res.status(404).json({ error:'Invalid POST request' }) })
  app.delete('*', function (req, res) { res.status(404).json({ error:'Invalid DELETE request' }) })
}