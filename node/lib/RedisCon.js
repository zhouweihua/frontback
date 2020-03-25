// https://blog.csdn.net/q282176713/article/details/80580886

const redis = require('redis')

const appConfig = require('../../config/app.config.js')
const client = redis.createClient(appConfig.redisConfig.port, appConfig.redisConfig.host)
client.on('error', err => {
  console.log('over Error ' + err)
})

client.set('hello', 'This is a value')

client.get = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, v) => {
      console.log('redis get ' + key + ' err,v', err, v)
      if (err) {
        reject(err)
      } else {
        resolve({
          code: 0,
          data: v,
        })
      }
    })
  })
}

client.set = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, v) => {
      console.log('redis set ' + key + ' err,v', err, v)
      if (err) {
        reject(err)
      } else {
        resolve({
          code: 0,
          data: v,
        })
      }
    })
  })
}
module.exports = client
