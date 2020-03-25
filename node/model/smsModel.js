// 0 成功 1 业务出错 2 底层程序出错

const AliSms = require('../lib/AliSms')
const RedisCon = require('../lib/RedisCon')

class smsMadel {
  // 发送短信验证码 同时将 userToken 以及 验证码 存入redis
  async sendSms({ tel, userToken }) {
    const smsRes = await AliSms.sendSms(tel)
    console.log('smsRes.data.smsCode --->', smsRes.data.smsCode)
    if (smsRes && smsRes.code === 0) {
      const redisRes = await RedisCon.set(userToken, smsRes.data.smsCode)
      if (redisRes && redisRes.code === 0) {
        return {
          code: 0,
          data: null,
        }
      } else {
        // redis 底层出错
        return {
          code: 2,
          data: null,
        }
      }
    } else {
      // alisms 底层出错
      return {
        code: 2,
        data: null,
      }
    }
  }

  // 验证短信验证码 消费掉redis中的验证码
  async smsVerify({ tel, verify, userToken }) {
    const redisRes = await RedisCon.get(userToken)
    if (redisRes && redisRes.code === 0) {
      if (redisRes.data === verify) {
        return {
          code: 0,
          data: null,
        }
      } else {
        // 业务出错
        return {
          code: 1,
          data: null,
        }
      }
    } else {
      // 底层出错
      return {
        code: 2,
        data: null,
      }
    }
  }
}

module.exports = smsMadel
