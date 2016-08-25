import React, { Component, PropTypes } from 'react'

import DeviceDebugPanel from '../components/DeviceDebugPanel'

const propTypes = {
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
  }

  onDeviceUUID = (deviceUUID) => {
    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
    this.setState({ deviceUUID })
    this.deviceFirehose.on(`device:${deviceUUID}`, this.onDevice)
    this.deviceFirehose.refresh(deviceUUID, (error) => this.setState({ error }))
  }

  onPath = (path) => {
    this.setState({ path })
  }

  onDevice = (device) => {
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
