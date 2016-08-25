import React, { Component } from 'react'

import HomePage from '../components/HomePage'
import DeviceFirehose from '../firehoses/device-firehose'
import {getCredentials} from '../services/auth-service'

export default class Home extends Component {
  state = {

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

  render(){
    const { error } = this.state

    return <HomePage error={error} deviceFirehose={this.deviceFirehose} />
  }
}
