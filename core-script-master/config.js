const path = require('path')

// ------------------------------------
// ENVIRONMENT
// ------------------------------------

const ALL_CONFIG_ENV = {
  rc: 'releaseCandidate',
  test: 'test',
  development: 'development',
  production: 'production'
}

// ------------------------------------
// PORT
// ------------------------------------

const port =  3300 || parseInt(process.env.PORT, 10) 

// ------------------------------------
// whether open redux action logger
// ------------------------------------

const openReduxActionLog = false


module.exports = {
  port,
  rootPath: __dirname,
  ALL_CONFIG_ENV,
  openReduxActionLog
}