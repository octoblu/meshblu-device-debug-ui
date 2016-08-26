import _ from 'lodash'
import React, { PropTypes } from 'react'
import styles from './styles.css'

const propTypes = {
  device: PropTypes.object,
  error: PropTypes.object,
  path: PropTypes.string,
}
const defaultProps = {}

const DeviceState = ({ device, error, path }) => {
  const part = (_.isEmpty(path)) ? device : _.get(device, path)
  var deviceStr = JSON.stringify(part, null, 2)
  if (_.isEmpty(deviceStr)) {
    deviceStr = "No Data Available"
  }

  if (error) {
    deviceStr = error.message
  }

  return (
    <pre className={styles.wrapper}><code>{deviceStr}</code></pre>
  )
}

DeviceState.propTypes    = propTypes
DeviceState.defaultProps = defaultProps

export default DeviceState
