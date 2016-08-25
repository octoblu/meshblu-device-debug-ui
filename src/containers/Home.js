import React, { Component } from 'react'
import uuid from 'uuid'

import HomePage from '../components/HomePage'
import DeviceFirehose from '../firehoses/device-firehose'
import {getCredentials} from '../services/auth-service'

export default class Home extends Component {
  state = {
    panels: [],
  }

  componentWillMount(){
    const credentials = getCredentials()
    this.deviceFirehose = new DeviceFirehose(credentials)
    this.deviceFirehose.connect(this.handleError)
  }

  handleError = (error) => {
    if (!error) return
    this.setState({ error })
  }

  onAdd = () => {
    const { panels } = this.state
    panels.push(uuid.v1())
    this.setState({ panels })
  }

  render(){
    const { error, panels } = this.state

    return <HomePage
      error={error}
      panels={panels}
      deviceFirehose={this.deviceFirehose}
      onAdd={this.onAdd} />
  }
}
