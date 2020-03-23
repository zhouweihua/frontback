const Core = require('@alicloud/pop-core')

const client = new Core({
  accessKeyId: '<accessKeyId>',
  accessKeySecret: '<accessSecret>',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
})

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

module.exports = client
