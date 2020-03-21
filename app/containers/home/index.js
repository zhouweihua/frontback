import React from 'react'

import axios from 'common/axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homeInfo: '',
    }
  }

  componentDidMount = async () => {
    const res = await this.loadData()
    // console.log(11)
    if (res) {
      this.setState({
        homeInfo: res.homeInfo,
      })
    }
  }

  loadData = async () => {
    return axios.get('/my/api/getDetail')
  }

  render() {
    return <div>{this.state.homeInfo}</div>
  }
}
