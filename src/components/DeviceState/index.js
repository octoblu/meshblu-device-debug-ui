import _ from 'lodash'
import React, { PropTypes } from 'react'
import JSONTree from 'react-json-tree'

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
  if (error) {
    return (
      <pre className={styles.wrapper}><code>{error.message}</code></pre>
    )
  }

  if (missingSubscription) {
    return (
      <div className={styles.wrapper}>
        <MissingSubscription
          onSubscribe={onSubscribe}
          message="User is not subscribed to this device's configure.sent messages."
        />
      </div>
    )
  }

  const part = (_.isEmpty(path)) ? device : _.get(device, path)

  if (_.isPlainObject(part)) {
    return <JSONTree data={part} hideRoot />
  }

  const partStr = JSON.stringify((part || null), null, 2)

  return <pre className={styles.wrapper}><code>{partStr}</code></pre>
}

DeviceState.propTypes    = propTypes
DeviceState.defaultProps = defaultProps

export default DeviceState
