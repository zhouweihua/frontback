const koaRouter = require('koa-router')
const token = require('../../lib/token')

const { UserModel, SmsModel } = require('../../model')

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

  router.post('/sendSms', async ctx => {
    const data = ctx.request.body
    // 用户验证
    const userRes = await new UserModel().findUser({
      tel: data.tel,
    })
    if (userRes && userRes.code === 0) {
      // 用户存在 短信发送
      const smsRes = await new SmsModel().sendSms({
        tel: data.tel,
        userToken: ctx.userToken,
      })
      if (smsRes && smsRes.code === 0) {
        ctx.body = {
          code: 0,
          data: {
            status: 9004,
            msg: '短信已发送',
          },
        }
      } else {
        ctx.body = {
          code: 0,
          data: {
            status: 9005,
            msg: '短信发送失败',
          },
        }
      }
    } else {
      // 用户不存在 要求用户填写基本信息
      return (ctx.body = {
        code: 0,
        data: {
          status: 9001,
          msg: '没有该用户信息，请注册',
        },
      })
    }
  })

  router.post('/sendSmsWithVerify', async ctx => {
    const data = ctx.request.body

    // 用户注册
    if (!data.weixin || !data.username) {
      return (ctx.body = {
        code: 0,
        data: {
          status: 1,
          msg: '微信或用户名不能为空',
        },
      })
    }
    const userRes = await await new UserModel().register({
      ...data,
    })
    if (userRes && userRes.code === 0) {
      // 用户注册成功 同时 短信发送
      const smsRes = await new SmsModel().sendSms({
        tel: data.tel,
        userToken: ctx.userToken,
      })
      // 发送短信成功
      if (smsRes && smsRes.code === 0) {
        ctx.body = {
          code: 0,
          data: {
            status: 9004,
            msg: '短信已发送',
          },
        }
      } else {
        ctx.body = {
          code: 0,
          data: {
            status: 9005,
            msg: '短信发送失败',
          },
        }
      }
    } else {
      return (ctx.body = {
        code: 0,
        data: {
          status: 9002,
          msg: '注册失败',
        },
      })
    }
  })

  router.post('/userVerify', async ctx => {
    const data = ctx.request.body
    if (!data.tel || !data.verify) {
      return (ctx.body = {
        code: 0,
        data: {
          status: 1,
          msg: '用户名或验证码不能为空',
        },
      })
    }
    // 用户验证
    const userRes = await new UserModel().findUser({
      tel: data.tel,
    })
    if (userRes && userRes.code === 0) {
      // 短信验证
      const smsRes = await new SmsModel().smsVerify({
        tel: data.tel,
        verify: data.verify,
        userToken: ctx.userToken,
      })
      if (smsRes && smsRes.code !== 0) {
        return (ctx.body = {
          code: 0,
          data: {
            status: 9003,
            msg: '短信验证码错误', // todo 超过次数
          },
        })
      }
      const loginToken = token.encrypt(
        {
          tel: data.tel,
        },
        '2h',
      )
      ctx.cookies.set('loginToken', loginToken, {
        // todo 上线的时候需要调整的
        // domain: 'localhost',
        // path: '/',
        maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
      })
      return (ctx.body = {
        code: 0,
        data: {
          status: 0,
          msg: '登录成功',
        },
      })
    } else {
      return (ctx.body = {
        code: 0,
        data: {
          status: 9001,
          msg: '没有该用户信息，请注册',
        },
      })
    }
  })
  mainRouter.use(router.routes())
}
