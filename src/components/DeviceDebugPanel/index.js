import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Card from 'zooid-card'
import Input from 'zooid-input'
import ResizableAndMovable from 'react-resizable-and-movable'

import DeviceState from '../DeviceState'
import MissingSubscription from '../MissingSubscription'
import styles from './styles.css'

const propTypes = {
  device: PropTypes.object,
  deviceUUID: PropTypes.string.isRequired,
  error: PropTypes.object,
  missingSubscription: PropTypes.bool.isRequired,
  name: PropTypes.string,
  path: PropTypes.string.isRequired,
  onDeviceUUID: PropTypes.func.isRequired,
  onName: PropTypes.func.isRequired,
  onPath: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired
}
const defaultProps = {}

const DeviceDebugPanel = (props) => {
  const { device, deviceUUID, error, missingSubscription, name, path, x, y, width, height } = props
  const { onDeviceUUID, onName, onPath, onRemove, onSubscribe, onDrag, onResize } = props

  const onChangeName = (event) => onName(event.target.value)
  const onChangeUUID = (event) => onDeviceUUID(event.target.value)
  const onChangePath = (event) => {
    onPath(event.target.value)
  }
  const onClickRemove = (event) => {
    event.preventDefault()
    onRemove()
  }
  const onDragEvent = (event, ui) => onDrag(ui.position.left, ui.position.top)
  const onResizeEvent = (direction, styleSize) => onResize(styleSize.width, styleSize.height)

  return (
    <ResizableAndMovable x={x?x:0} y={y?y:0} width={width?width:'50%'} height={height?height:'100%'}
      onResizeStop = {onResizeEvent}
      onDragStop = {onDragEvent}>
      <Card className={styles.card}>
        <a href onClick={onClickRemove} className={styles.remove}>&times;</a>

        <Input placeholder="Name" onChange={onChangeName} value={name} />
        <Input label="Device UUID" required onChange={onChangeUUID} value={deviceUUID} />
        <Input label="Path" onChange={onChangePath} value={path} />

        <DeviceState
          device={device}
          missingSubscription={missingSubscription}
          error={error}
          path={path}
          onSubscribe={onSubscribe} />
      </Card>
    </ResizableAndMovable>
  )
}

DeviceDebugPanel.propTypes    = propTypes
DeviceDebugPanel.defaultProps = defaultProps

export default DeviceDebugPanel
