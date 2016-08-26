import _ from 'lodash'
import React, { PropTypes } from 'react'

import MissingSubscription from '../MissingSubscription'
import styles from './styles.css'

const propTypes = {
  device: PropTypes.object,
  error: PropTypes.object,
  missingSubscription: PropTypes.bool.isRequired,
  path: PropTypes.string,
  onSubscribe: PropTypes.func.isRequired,
}
const defaultProps = {}

const DeviceState = ({ device, error, missingSubscription, path, onSubscribe }) => {
  if (missingSubscription) {
    return (
      <div className={styles.wrapper}>
        <MissingSubscription
          onSubscribe={onSubscribe}
          message="User is not subscribed to this device's configure.sent messages." />
      </div>
    )
  }

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
