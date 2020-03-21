import React from 'react'
import PropTypes from 'prop-types'

export default class ComponentTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reflash: false,
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data } = this.props

    return <div>{data}</div>
  }
}
