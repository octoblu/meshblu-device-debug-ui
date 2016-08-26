import React, { Component, PropTypes } from 'react'

import DeviceDebugPanel from '../components/DeviceDebugPanel'
import {clearPanelInfo, getPanelInfo, setPanelInfo} from '../services/panels-service'

const propTypes = {
  panelID: PropTypes.string.isRequired,
  deviceFirehose: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
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
    this._onPanelRemove = props.onRemove
  }

  componentWillMount() {
    this.loadFromLocalStorage()
  }

  componentWillUnmount() {
    this.cancelled = true
    const { panelID } = this.state
    const { deviceUUID, name, path } = getPanelInfo(panelID)
    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
  }

  handleError = (error) => {
    if (this.cancelled) return
    if (error) return this.setState({ error })
  }

  loadFromLocalStorage() {
    const { panelID } = this.state
    const { deviceUUID, name, path } = getPanelInfo(panelID)

    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
    this.setState({ deviceUUID, name, path })
    this.deviceFirehose.on(`device:${deviceUUID}`, this.onDevice)
    this.deviceFirehose.refresh(deviceUUID, this.handleError)
  }

  onDevice = (device) => {
    const { deviceUUID } = this.state
    if (device.uuid != deviceUUID) return this.setState({ device: null })
    this.setState({ device })
  }

  onDeviceUUID = (deviceUUID) => {
    const { panelID, device } = this.state
    if (device && device.uuid != deviceUUID) this.setState({ device: null })
    setPanelInfo(panelID, { deviceUUID })
    this.loadFromLocalStorage()
  }

  onName = (name) => {
    setPanelInfo(this.state.panelID, { name })
    this.loadFromLocalStorage()
  }

  onPath = (path) => {
    setPanelInfo(this.state.panelID, { path })
    this.loadFromLocalStorage()
  }

  onRemove = () => {
    clearPanelInfo(this.state.panelID)
    this._onPanelRemove(this.state.panelID)
  }

  render(){
    const { device, deviceUUID, error, name, path } = this.state

    return (
      <DeviceDebugPanel
        device={device}
        deviceUUID={deviceUUID}
        error={error}
        name={name}
        path={path}
        onDeviceUUID={this.onDeviceUUID}
        onName={this.onName}
        onPath={this.onPath}
        onRemove={this.onRemove} />
    )
  }
}

DeviceDebug.propTypes = propTypes
