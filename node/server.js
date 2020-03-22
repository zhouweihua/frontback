const Promise = require('bluebird')

Promise.config({
  warnings: false,
  longStackTraces: true,
})

global.Promise = Promise

const path = require('path')
const Koa = require('koa')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')

const router = require('./router')
const userToken = require('./middlewares/user-token')

const app = new Koa()

app.use(bodyParser())

app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../build'),
    nunjucksConfig: {
      noCache: true,
      autoescape: true,
    },
  }),
)

// 添加用户token
app.use(userToken())

// 配置静态资源
const staticPath = '../build'
app.use(koaStatic(path.join(__dirname, staticPath)))

// 路由配置
const routes = router.routes()
app.use(routes)

app.listen(8080, () => {
  console.log(`server started at localhost:${8080}`)
})
