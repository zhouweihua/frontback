const redis = require('redis')

const appConfig = require('../../config/app.config.js')
const client = redis.createClient(appConfig.redisConfig.port, appConfig.redisConfig.host)
client.on('error', err => {
  console.log('Error ' + err)
})

module.exports = client
