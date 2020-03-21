const koaRouter = require('koa-router')

module.exports = mainRouter => {
  const router = koaRouter()

  router.get('/getDetail', async ctx => {
    ctx.body = {
      code: 0,
      data: {
        homeInfo: 'homeInfo',
      },
    }
  })
  mainRouter.use(router.routes())
}
