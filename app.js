var config   = require('./config')
  , express  = require('express')
  , mongoose = require('mongoose')
  , fs       = require('fs')
  , db       = {}
var path = require('path');

var filter = require('content-filter')
var helmet = require('helmet')

// connect mongoose
mongoose.connect(config.db, { server: { keepAlive: 1, auto_reconnect: true } })
var conn = mongoose.connection

// mongoose connection 'error'
conn.on('error', function () {
  console.log('\nMongoose failed to connect:', config.db)
  mongoose.disconnect()
})

// mongoose connection 'open'
conn.on('open', function () {
  console.log('\nMongoose connection opened:', config.db)
  
  // config mongoose models
  var modelsPath = __dirname + '/app/models'
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) 
      db[file.replace('.js', '')] = require(modelsPath + '/' + file)(mongoose, config)
  })
  
  // config Nomadic Fitness affiliate and admin
  require('./config/admin')(config, db)

  // create app
  var app   = express()
    , http  = require('http').createServer(app)

  app.use(filter());
  app.use(helmet());

  // config app
  require('./config/express')(app, config)
  require('./config/routes')(app, http, db)
  

  // serve app
  http.listen(config.port, function () {
    console.log("PSD API running at http://" + config.host + ":" + config.port)
  })
})
