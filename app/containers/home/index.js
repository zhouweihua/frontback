import React from 'react'

import axios from 'common/axios'

import './style.less'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tel: undefined,
      verify: undefined,
      username: undefined,
      weixin: undefined,
      countDownText: '点击发送',
      countDownDisable: false,
      submitFlag: 0, // 0 只登陆 1 登录同时提交用户信息
    }
  }

  handleChagneTel = e => {
    this.setState({
      tel: e.target.value,
    })
  }

  handleChagneVerify = e => {
    this.setState({
      verify: e.target.value,
    })
  }

  handleChagneName = e => {
    this.setState({
      username: e.target.value,
    })
  }

  handleChagneVerify = e => {
    this.setState({
      verify: e.target.value,
    })
  }

  handleSendSms = async () => {
    // 校验手机号
    if (!this.state.tel) {
      alert('请输入手机号')
      return
    }
    if (this.state.countDownDisable) {
      alert('请稍后再试')
      return
    }
    let res
    if (this.state.submitFlag === 0) {
      // 用户已经注册的情况下发送短信
      res = await axios.post('/my/api/sendSms', {
        tel: this.state.tel,
      })
    } else {
      if (!this.state.weixin) {
        alert('请输入微信号')
        return
      }

      if (!this.state.username) {
        alert('请输入用户姓名')
        return
      }

      res = await axios.post('/my/api/sendSmsWithVerify', {
        tel: this.state.tel,
        username: this.state.username,
        weixin: this.state.weixin,
      })
    }

    console.log(res)

    if (res && res.status === 9001) {
      // 没有该用户 需要填写姓名已经微信号
      this.setState({
        submitFlag: 1,
      })
      alert('没有该用户 需要填写姓名已经微信号--' + res.status)
    }

    if (res && res.status === 9004) {
      // 短信发送成功 倒计时
      this.setState({
        countDownText: 60,
        countDownDisable: true,
      })
      this.countDownTime()
    } else {
      alert('短信发送失败 请重试--' + res.status)
    }
  }

  countDownTime = () => {
    if (this.state.countDownText > 0) {
      this.countDown = window.setInterval(() => {
        if (this.state.countDownText > 0) {
          this.setState({
            countDownText: this.state.countDownText - 1,
          })
        } else {
          this.clearCountDown()
        }
      }, 1000)
    } else {
      this.clearCountDown()
    }
  }

  clearCountDown = () => {
    window.clearInterval(this.countDown)
    this.setState({
      countDownText: '点击发送',
      countDownDisable: false,
    })
  }

  componentWillUnmount = () => {
    this.clearCountDown()
  }

  handleSubmitInfo = async () => {
    // 校验手机号
    if (!this.state.tel || !this.state.verify) {
      alert('请输入手机号 或者 验证码')
      return
    }

    const res = await axios.post('/my/api/userVerify', {
      tel: this.state.tel,
      verify: this.state.verify,
    })
    console.log(res)

    if (res && res.status === 9003) {
      // 短信验证码错误
      alert('短信验证码错误--' + res.status)
    }

    if (res && res.status === 0) {
      alert('登录成功')
    } else {
      alert('登录失败--' + res.status)
    }
  }

  render() {
    const { submitFlag } = this.state

    return (
      <div className="homeContainer">
        <div className="inputInfo">
          <div className="commonInput">
            <div>手机号</div>
            <input className="commonNum" onChange={this.handleChagneTel} value={this.state.tel} />
          </div>

          {submitFlag ? (
            <div className="commonInput">
              <div>中文名</div>
              <input
                className="commonNum"
                onChange={this.handleChagneName}
                value={this.state.username}
              />
            </div>
          ) : null}

          {submitFlag ? (
            <div className="commonInput">
              <div>微信号</div>
              <input
                className="commonNum"
                onChange={this.handleChagneWeixin}
                value={this.state.weixin}
              />
            </div>
          ) : null}

          {submitFlag ? <div>* 只有填写了姓名以及微信号才能发送验证码</div> : null}

          <div className="verifyInput">
            <div>验证码</div>
            <input
              className="verifyNum"
              onChange={this.handleChagneVerify}
              value={this.state.verify}
            />
            <div className="smsSend" onClick={this.handleSendSms}>
              {this.state.countDownText}
            </div>
          </div>
        </div>
        <div className="submitInfo" onClick={this.handleSubmitInfo}>
          提交
        </div>
      </div>
    )
  }
}
