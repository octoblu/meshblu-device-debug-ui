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

  if (error) {
    return(
      <pre className={styles.wrapper}><code>{error.message}</code></pre>
    )
  }

  if(part !== null || part !== undefined) {
    if(typeof part === 'object') {
      return (
        <JSONTree data={part} hideRoot={true}/>
      )
    } else {
      return (
        <pre className={styles.wrapper}><code>{JSON.stringify(part)}</code></pre>
      )
    }
  } else {
    return(
      <pre className={styles.wrapper}><code>"No Data Available"</code></pre>
    )
  }
}

DeviceState.propTypes    = propTypes
DeviceState.defaultProps = defaultProps

export default DeviceState
