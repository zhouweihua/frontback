// 0 成功 1 业务出错 2 底层程序出错

const MysqlCon = require('../lib/MysqlCon')
const moment = require('moment')

class userModel {
  // 查找数据库

  async findUser({ tel }) {
    console.log('findUser ---> ', tel)
    const results = await new MysqlCon()
      .connect(`SELECT tel, name FROM mm_person_info WHERE tel='${tel}';`)
      .catch(e => {
        // 查询报错
        return {
          code: 2,
          data: e,
        }
      })
    if (results && results.length > 0) {
      // 查到该人 直接返回
      return {
        code: 0,
        data: results,
      }
    } else {
      // 查无此人
      return {
        code: 1,
        data: null,
      }
    }
  }

  // 验证数据库
  async register({ tel, weixin, username }) {
    console.log('register ---> ', tel, weixin, username)
    const findRes = await this.findUser({ tel })
    if (findRes && findRes.code === 0) {
      // 查到该人
      return {
        code: 1,
        data: null,
      }
    } else if (findRes && findRes.code === 2) {
      // 接口失败
      return {
        code: 2,
        data: findRes.data,
      }
    } else {
      const results = await new MysqlCon()
        .connect(
          `INSERT INTO mm_person_info ( tel, name, weixin, email, user_type, create_time, last_edit_time ) VALUES ( '${tel}', '${username}', '${weixin}', 'test@test.com', 0, '${moment(
            new Date(),
          ).format('YYYY-MM-DD HH:mm:ss')}', '${moment(new Date()).format(
            'YYYY-MM-DD HH:mm:ss',
          )}' );`,
        )
        .catch(e => {
          return {
            code: 2,
            data: e,
          }
        })
      console.log(results)
      if (results && results.affectedRows === 1) {
        return {
          code: 0,
          data: results,
        }
      } else {
        // 插入失败
        return {
          code: 1,
          data: null,
        }
      }
    }
  }
}

module.exports = userModel
