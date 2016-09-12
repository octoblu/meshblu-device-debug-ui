import React, { Component, PropTypes } from 'react'

import DeviceDebugPanel from '../components/DeviceDebugPanel'
import {clearPanelInfo, getPanelInfo, setPanelInfo} from '../services/panels-service'
import {createSubscription, verifySubscription} from '../services/subscriptions-service'
import {getDevices, getDevice} from '../services/devices-service'

const propTypes = {
  panelID: PropTypes.string.isRequired,
  deviceFirehose: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default class DeviceDebug extends Component {
  state = {
    deviceUUID: '',
    path: '',
    missingSubscription: false,
  }

  constructor(props) {
    super(props)
    this.deviceFirehose = props.deviceFirehose
    this.state.panelID = props.panelID
    this._onPanelRemove = props.onRemove
  }

  componentWillMount() {
    let self = this;
    this.loadFromLocalStorage()
    getDevices(function(error, devices){
      if(error) return console.log(error)
      self.setState({devices})
    })
  }

  componentWillUnmount() {
    this.cancelled = true
    const { panelID } = this.state
    const { deviceUUID, name, path, x, y, width, height } = getPanelInfo(panelID)
    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
  }

  handleError = (error) => {
    if (this.cancelled) return
    if (error) return this.setState({ error })
  }

  loadFromLocalStorage() {
    const { panelID } = this.state
    const { deviceUUID, name, path, x, y, width, height } = getPanelInfo(panelID)

    this.deviceFirehose.off(`device:${this.state.deviceUUID}`, this.onDevice)
    this.setState({ deviceUUID, name, path, x, y, width, height }, () => {
      this.deviceFirehose.on(`device:${deviceUUID}`, this.onDevice)
      this.deviceFirehose.refresh(deviceUUID, this.handleError)
      this.verifyConfigureSent()
    })
  }

  onDevice = (device) => {
    const { deviceUUID } = this.state
    if (device.uuid != deviceUUID) return this.setState({ device: null })
    this.setState({ device })
  }

  onDeviceChange = (newDevice) => {
    const { panelID, device } = this.state
    if( (!device && newDevice) || (device && newDevice && device.uuid != newDevice.uuid) ) {
      this.setState({device: null})
      setPanelInfo(panelID, { deviceUUID: newDevice.uuid })
      this.loadFromLocalStorage()
    }
  }

  onPath = (path) => {
    setPanelInfo(this.state.panelID, { path })
    this.loadFromLocalStorage()
  }

  onRemove = () => {
    clearPanelInfo(this.state.panelID)
    this._onPanelRemove(this.state.panelID)
  }

  onSubscribe = () => {
    const { deviceUUID } = this.state
    const subscription = {emitterUuid: deviceUUID, type: 'configure.sent'}
    createSubscription(subscription, (error) => {
      if (error) return this.handleError(error)

      this.loadFromLocalStorage()
    })
  }

  onDrag = (x, y) => {
    setPanelInfo(this.state.panelID, {x, y})
  }

  onResize = (width, height) => {
    setPanelInfo(this.state.panelID, {width, height})
  }

  verifyConfigureSent() {
    const {deviceUUID} = this.state
    if (_.isEmpty(deviceUUID)) return

    const subscription = {emitterUuid: deviceUUID, type: 'configure.sent'}
    verifySubscription(subscription, (error, verified) => {
      if (error) return this.handleError(error)
      if (this.cancelled) return
      this.setState({ missingSubscription: !verified })
    })
  }

  render(){
    const { device, deviceUUID, error, missingSubscription, name, path, x, y, width, height, devices } = this.state

    return (
      <DeviceDebugPanel
        device={device}
        devices={devices}
        deviceUUID={deviceUUID}
        error={error}
        missingSubscription={missingSubscription}
        name={name}
        path={path}
        x={x}
        y={y}
        width={width}
        height={height}
        onDeviceChange={this.onDeviceChange}
        onPath={this.onPath}
        onRemove={this.onRemove}
        onSubscribe={this.onSubscribe}
        onDrag={this.onDrag}
        onResize={this.onResize} />
    )
  }
}

DeviceDebug.propTypes = propTypes
