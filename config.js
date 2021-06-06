let config = {}

config.web = {}
config.db = {}

// web address config
config.web.baseURL = 'https://e-law.herokuapp.com/'
config.web.port = process.env.PORT || 3000;

// Local Database config
// config.db.host = '31.22.4.109'
// config.db.user = 'letsoft_elaw_user'
// config.db.password = '0D86W+s)]*dG'
// config.db.dbName = 'letsofto_elaw'
// config.db.port = 3306

// Remote Database config
config.db.host = 'databaseinstance.cohesbi5e4hv.us-east-2.rds.amazonaws.com'
config.db.user = 'admin'
config.db.password = 'Createyour1'
config.db.dbName = 'elaw_db'
config.db.port = 3306

module.exports = config

