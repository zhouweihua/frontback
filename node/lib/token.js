const jwt = require('jsonwebtoken')

const Token = {
  encrypt: function(data, time = '2h') {
    // data加密数据，time过期时间
    return jwt.sign(data, 'token', { expiresIn: time })
  },
  decrypt: function(token) {
    try {
      const data = jwt.verify(token, 'token')
      return {
        token: true,
        data: data,
      }
    } catch (e) {
      return {
        token: false,
        data: e,
      }
    }
  },
}

module.exports = Token
