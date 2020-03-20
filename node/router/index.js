const Router = require('koa-router')

const home = require('../controllers/home') // todo 如何做到省略../
const customRouter = require('./router')

const router = new Router()
// 首页
router
  .get('/', home)
  // 路由定义
  .use(customRouter.routes())
  // 自动代理到 java 和 首页渲染
  .all('*', async (ctx, next) => {
    const path = ctx.path
    // todo 接口直接转发
    await home(ctx)
  })

module.exports = router
