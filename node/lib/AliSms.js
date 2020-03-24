// const Core = require('@alicloud/pop-core')

// const appConfig = require('../../config/app.config.js')

// const client = new Core({
//   accessKeyId: appConfig.aliSmsConfig.accessKeyId,
//   accessKeySecret: appConfig.aliSmsConfig.accessKeySecret,
//   endpoint: 'https://dysmsapi.aliyuncs.com',
//   apiVersion: '2017-05-25',
// })

// const params = {
//   "RegionId": "cn-hangzhou"
// }

// const requestOption = {
//   method: 'POST'
// };

// client.request('SendSms', params, requestOption).then((result) => {
//   console.log(JSON.stringify(result));
// }, (ex) => {
//   console.log(ex);
// })
const aliSms = {}
aliSms.sendSms = () => {
  return {
    code: 0,
    data: {
      code: 1234,
    },
  }
}
module.exports = aliSms
