import React, { Component } from 'react'

import HomePage from '../components/HomePage'
import DeviceFirehose from '../firehoses/device-firehose'
import {getCredentials} from '../services/auth-service'
import {addPanel, getPanels, removePanel} from '../services/panels-service'
import {createConfigureReceived, verifyConfigureReceived} from '../services/subscriptions-service'

export default class Home extends Component {
  state = {
    panels: [],
    missingSubscription: false,
  }

  componentWillMount(){
    const credentials = getCredentials()
    this.deviceFirehose = new DeviceFirehose(credentials)
    this.deviceFirehose.connect(this.handleError)
    this.loadPanels()
    this.verifyConfigureReceived()
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

  onRemove = (panelID) => {
    removePanel(panelID)
    this.loadPanels()
  }

  onSubscribe = () => {
    const credentials = getCredentials()
    createConfigureReceived(credentials.uuid, (error) => {
      if (error) return this.handleError(error)

      this.verifyConfigureReceived()
    })
  }

  verifyConfigureReceived() {
    const credentials = getCredentials()
    verifyConfigureReceived(credentials.uuid, (error, verified) => {
      if (error) return this.handleError(error)
      this.setState({ missingSubscription: !verified })
    })
  }

  render(){
    const { error, missingSubscription, panels } = this.state

    return <HomePage
      error={error}
      missingSubscription={missingSubscription}
      panels={panels}
      deviceFirehose={this.deviceFirehose}
      onAdd={this.onAdd}
      onRemove={this.onRemove}
      onSubscribe={this.onSubscribe} />
  }
}
