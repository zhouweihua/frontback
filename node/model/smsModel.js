class smsMadel {
  // 查找数据库
  async sendSms({ tel, smsVerify }) {
    return {
      code: 0,
      data: null,
    }
  }

  async smsVerify({ tel, verify, smsVerify }) {
    return {
      code: 0,
      data: null,
    }
  }
}

module.exports = smsMadel
