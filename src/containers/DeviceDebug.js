import React, { Component, PropTypes } from 'react'

import DeviceDebugPanel from '../components/DeviceDebugPanel'
import {getPanelInfo, setPanelInfo} from '../services/panels-service'

const propTypes = {
  panelID: PropTypes.string.isRequired,
  deviceFirehose: PropTypes.object.isRequired,
}

export default class DeviceDebug extends Component {
  state = {
    deviceUUID: '',
    path: '',
  }

  constructor(props) {
    super(props)
    this.deviceFirehose = props.deviceFirehose
    this.state.panelID = props.panelID
  }

  componentWillMount() {
    this.loadFromLocalStorage()
  }

  loadFromLocalStorage() {
    const { panelID } = this.state
    const { deviceUUID, path } = getPanelInfo(panelID)

    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
    this.setState({ deviceUUID, path })
    this.deviceFirehose.on(`device:${deviceUUID}`, this.onDevice)
    this.deviceFirehose.refresh(deviceUUID, (error) => this.setState({ error }))
  }

  onDeviceUUID = (deviceUUID) => {
    const { panelID, path, device } = this.state
    if (device && device.uuid != deviceUUID) this.setState({ device: null })
    setPanelInfo(panelID, { path, deviceUUID })
    this.loadFromLocalStorage()
  }

  onPath = (path) => {
    const { panelID, deviceUUID } = this.state
    setPanelInfo(panelID, { path, deviceUUID })
    this.loadFromLocalStorage()
  }

  onDevice = (device) => {
    const { deviceUUID } = this.state
    if (device.uuid != deviceUUID) return this.setState({ device: null })
    this.setState({ device })
  }

  render(){
    const { device, deviceUUID, path } = this.state

    return (
      <DeviceDebugPanel
        device={device}
        deviceUUID={deviceUUID}
        path={path}
        onDeviceUUID={this.onDeviceUUID}
        onPath={this.onPath} />
    )
  }
}

DeviceDebug.propTypes = propTypes
