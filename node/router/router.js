const Router = require('koa-router')
const path = require('path')
const glob = require('glob')
const { pagePrefix, apiPrefix } = require('../../config/app.config')

// 路由定义
const mainRouter = new Router({ prefix: `${pagePrefix}` })

const apiRouter = new Router({
  prefix: `${apiPrefix}`,
})

const apiDir = path.join(__dirname, '../controllers/api')

glob
  .sync('**/*.js', {
    cwd: apiDir,
  })
  .forEach(ctrPath => {
    require(path.join(apiDir, ctrPath))(apiRouter)
  })

mainRouter.use(apiRouter.routes())

module.exports = mainRouter
