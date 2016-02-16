var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8000
  //, port = 80
  , admin = {
    "role": "admin",
    "email": "adheeshbhatia@gmail.com",
    "password": "password1",
    "name": "Adheesh Bhatia"
  }

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://localhost/psd-dev',
    admin: admin,
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://localhost/db-production',
    admin: admin,
  }
};

module.exports = config[env];
