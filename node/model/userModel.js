class userModel {
  // 查找数据库
  async findUser({ tel }) {
    console.log('findUser ---> ', tel)
    return {
      code: 0,
      data: null,
    }
  }
}

module.exports = userModel
