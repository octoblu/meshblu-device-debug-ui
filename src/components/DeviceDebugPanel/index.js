import React, { PropTypes } from 'react'
import Card from 'zooid-card'
import Input from 'zooid-input'

import DeviceState from '../DeviceState'

const propTypes = {
  device: PropTypes.object,
  deviceUUID: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onDeviceUUID: PropTypes.func.isRequired,
  onPath: PropTypes.func.isRequired,
}
const defaultProps = {}

const DeviceDebugPanel = ({ device, deviceUUID, path, onDeviceUUID, onPath }) => {
  const onChangeUUID = (event) => onDeviceUUID(event.target.value)
  const onChangePath = (event) => onPath(event.target.value)

  return (
    <Card>
      <Input label="Device UUID" required onChange={onChangeUUID} value={deviceUUID} />
      <Input label="Path" onChange={onChangePath} value={path} />

      <DeviceState device={device} path={path} />
    </Card>
  )
}

DeviceDebugPanel.propTypes    = propTypes
DeviceDebugPanel.defaultProps = defaultProps

export default DeviceDebugPanel
