class userModel {
  // 查找数据库
  async findUser({ tel }) {
    console.log('findUser ---> ', tel)
    return {
      code: 0,
      data: null,
    }
  }

  // 验证数据库
  async register({ tel, weixin, username }) {
    console.log('register ---> ', tel, weixin, username)
    return {
      code: 0,
      data: null,
    }
  }
}

module.exports = userModel
