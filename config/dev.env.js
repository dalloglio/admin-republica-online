var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://localhost.api.republica.online"',
    API_CLIENT_ID: '"1"',
    API_CLIENT_SECRET: '"SWT2x59ULyZpcyxniI1QPuQ2TV6XOACstdBTEoH9"'
})
