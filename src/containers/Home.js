import React, { Component } from 'react'

import HomePage from '../components/HomePage'
import DeviceFirehose from '../firehoses/device-firehose'
import {getCredentials} from '../services/auth-service'
import {addPanel, getPanels} from '../services/panels-service'

export default class Home extends Component {
  state = {
    panels: [],
  }

  componentWillMount(){
    const credentials = getCredentials()
    this.deviceFirehose = new DeviceFirehose(credentials)
    this.deviceFirehose.connect(this.handleError)
    this.loadPanels()
  }

  handleError = (error) => {
    if (!error) return
    this.setState({ error })
  }

  loadPanels() {
    this.setState({ panels: getPanels() })
  }

  onAdd = () => {
    addPanel()
    this.loadPanels()
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
