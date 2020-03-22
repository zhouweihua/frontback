// everybody get an user token for identity

const token = require('../lib/token')

module.exports = () => {
  return async function(ctx, next) {
    let userToken = ctx.cookies.get('userToken')
    if (!userToken) {
      userToken = token.encrypt({ random: Math.random() + new Date().getMilliseconds }, '2h')
      ctx.cookies.set('userToken', userToken, {
        // todo 上线的时候需要调整的
        // domain: 'localhost',
        // path: '/',
        maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
      })
    }
    ctx.userToken = userToken // 不管怎么样 userToken 先绑定上去
    return next()
  }
}
