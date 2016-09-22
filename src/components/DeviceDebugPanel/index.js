import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Card from 'zooid-card'
import Input from 'zooid-input'
import Label from 'zooid-form-label'
import DevicePicker from 'zooid-meshblu-device-picker'
import ResizableAndMovable from 'react-resizable-and-movable'

import DeviceState from '../DeviceState'
import MissingSubscription from '../MissingSubscription'
import styles from './styles.css'

const propTypes = {
  device: PropTypes.object,
  devices: PropTypes.array,
  deviceUUID: PropTypes.string.isRequired,
  error: PropTypes.object,
  missingSubscription: PropTypes.bool.isRequired,
  name: PropTypes.string,
  path: PropTypes.string.isRequired,
  onDeviceChange: PropTypes.func.isRequired,
  onPath: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
}
const defaultProps = {}

const DeviceDebugPanel = (props) => {
  const { device, devices, deviceUUID, error, missingSubscription, name, path, x, y, width, height } = props
  const { onDeviceChange, onPath, onRemove, onSubscribe, onDrag, onResize } = props

  const onChangePath = (event) => {
    onPath(event.target.value)
  }
  const onClickRemove = (event) => {
    event.preventDefault()
    onRemove()
  }
  const onDragEvent = (event, ui) => onDrag(ui.position.left, ui.position.top)
  const onResizeEvent = (direction, styleSize) => onResize(styleSize.width, styleSize.height)
  const onDeviceSelection = (device) => onDeviceChange(device)

  return (
    <ResizableAndMovable
      x={x ? x : 0}
      y={y ? y : 0}
      width={width ? width : ''}
      height={height ? height : ''}
      isResizable={{ top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      onResizeStop={onResizeEvent}
      onDragStop={onDragEvent}
    >
      <Card className={styles.card}>
        <a href onClick={onClickRemove} className={styles.remove}>&times;</a>

        <Label>Device</Label>
        <DevicePicker devices={devices} onSelection={onDeviceSelection} defaultDevice={device} />

        <br />
        <Input label="Path" onChange={onChangePath} value={path} />

        <DeviceState
          device={device}
          missingSubscription={missingSubscription}
          error={error}
          path={path}
          onSubscribe={onSubscribe}
        />
      </Card>
    </ResizableAndMovable>
  )
}

DeviceDebugPanel.propTypes    = propTypes
DeviceDebugPanel.defaultProps = defaultProps

export default DeviceDebugPanel
