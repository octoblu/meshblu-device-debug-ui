import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Card from 'zooid-card'
import Input from 'zooid-input'

import DeviceState from '../DeviceState'
import styles from './styles.css'

const propTypes = {
  device: PropTypes.object,
  deviceUUID: PropTypes.string.isRequired,
  error: PropTypes.object,
  name: PropTypes.string,
  path: PropTypes.string.isRequired,
  onDeviceUUID: PropTypes.func.isRequired,
  onName: PropTypes.func.isRequired,
  onPath: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
const defaultProps = {}

const DeviceDebugPanel = ({ device, deviceUUID, error, name, path, onDeviceUUID, onName, onPath, onRemove }) => {
  const onChangeName = (event) => onName(event.target.value)
  const onChangeUUID = (event) => onDeviceUUID(event.target.value)
  const onChangePath = (event) => onPath(event.target.value)
  const onClickRemove = (event) => {
    event.preventDefault()
    onRemove()
  }

  return (
    <Card className={styles.card}>
      <a href onClick={onClickRemove} className={styles.remove}>&times;</a>

      <Input placeholder="Name" onChange={onChangeName} value={name} className={styles.name} />
      <Input label="Device UUID" required onChange={onChangeUUID} value={deviceUUID} />
      <Input label="Path" onChange={onChangePath} value={path} />

      <DeviceState device={device} error={error} path={path} />
    </Card>
  )
}

DeviceDebugPanel.propTypes    = propTypes
DeviceDebugPanel.defaultProps = defaultProps

export default DeviceDebugPanel
