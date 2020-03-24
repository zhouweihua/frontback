const mysql = require('mysql')

const appConfig = require('../../config/app.config.js')
const connection = mysql.createConnection({
  host: appConfig.mysqlConfig.host,
  user: appConfig.mysqlConfig.user,
  password: appConfig.mysqlConfig.password,
  database: appConfig.mysqlConfig.database,
})

connection.connect()

class MysqlCon {
  async connect(sqlLine) {
    return new Promise((resolve, reject) => {
      connection.query(sqlLine, (error, results, fields) => {
        if (error) {
          // todo 报错处理
          console.log('MysqlCon connect error ---> ', error)
          reject(error)
        }
        console.log('MysqlCon connect solution is ---> ', results)
        resolve(results) // 包含了2中情况 有数据 没数据
      })
    })
  }
}

module.exports = MysqlCon
