var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost.api.republica.online"',
  API_CLIENT_ID: '"4"',
  API_CLIENT_SECRET: '"m9cOaHqKgWN1X1VFLmaO6AhYuk9fYTBKiSqHo9Do"',
  API_VERSION: '"v1"'
})
