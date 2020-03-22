class smsMadel {
  // 发送短信验证码 同时将 userToken 以及 验证码 存入redis
  async sendSms({ tel, userToken }) {
    return {
      code: 0,
      data: null,
    }
  }

  // 验证短信验证码 消费掉redis中的验证码
  async smsVerify({ tel, verify, userToken }) {
    return {
      code: 0,
      data: null,
    }
  }
}

module.exports = smsMadel
