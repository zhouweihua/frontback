'use strict'

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

const root = path.join(__dirname, '..')
const configPath = path.join(root, `config/webpack.config`)
const config = require(configPath)
const buildPath = config.output.path

Promise.resolve()
  .then(() => {
    return Promise.all([fs.removeAsync(buildPath)])
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            stats.toString({
              colors: true,
              timings: true,
              hash: true,
              version: true,
              errorDetails: true,
              assets: false,
              chunks: false,
              children: false,
              modules: false,
              chunkModules: false,
            }),
          )

          return reject(err)
        }
        resolve()
      })
    })
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
