const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'm2m',
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
