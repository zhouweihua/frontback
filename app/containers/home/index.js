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

  handleChagneWeixin = e => {
    this.setState({
      weixin: e.target.value,
    })
  }

  handleSendSms = async () => {
    // 校验手机号
    if (!this.state.tel) {
      alert('请输入手机号')
      return
    }
    if (!/^1[2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.tel)) {
      alert('手机格式不正确')
      return
    }
    if (this.state.countDownDisable) {
      alert('请稍后再试')
      return
    }
    const res = await axios.post('/my/api/sendSms', {
      tel: this.state.tel,
    })

    this.getAlertInfo(res)
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

    if (this.state.submitFlag === 1) {
      // 验证验证码之后将用户信息存储下来
      if (!this.state.weixin) {
        alert('请输入微信号')
        return
      }
      if (!this.state.username) {
        alert('请输入用户姓名')
        return
      }
    }

    const res = await axios.post('/my/api/userVerify', {
      tel: this.state.tel,
      verify: this.state.verify,
      username: this.state.username,
      weixin: this.state.weixin,
      submitFlag: this.state.submitFlag,
    })
    this.getAlertInfo(res)
  }

  getAlertInfo = res => {
    if (res && (res.status === 9001 || res.status === 9002)) {
      this.setState({
        submitFlag: res.status === 9001 ? 1 : 0, // 9001: 没有该用户 需要填写姓名已经微信号 同时短信也会发送出去
        countDownText: 60,
        countDownDisable: true,
      })
      this.countDownTime()
    }

    if (res && res.status === 0) {
      alert('登录成功')
      return true
    } else {
      alert(((res && res.msg) || '不明失败') + '--' + res.status)
      return false
    }
  }

  render() {
    const { submitFlag } = this.state

    return (
      <div className="homeContainer">
        <div className="inputInfo">
          <div className="commonInput">
            <div>手机号</div>
            <input
              className="commonNum"
              maxLength="11"
              onChange={this.handleChagneTel}
              value={this.state.tel}
            />
          </div>

          <div className="verifyInput">
            <div>验证码</div>
            <input
              className="verifyNum"
              maxLength="4"
              onChange={this.handleChagneVerify}
              value={this.state.verify}
            />
            <div className="smsSend" onClick={this.handleSendSms}>
              {this.state.countDownText}
            </div>
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
        </div>
        <div className="submitInfo" onClick={this.handleSubmitInfo}>
          提交
        </div>
      </div>
    )
  }
}
