import _ from 'lodash'
import React, { PropTypes } from 'react'

const propTypes = {
  device: PropTypes.object,
  path: PropTypes.string,
}
const defaultProps = {}

const DeviceState = ({ device, path }) => {
  const part = (_.isEmpty(path)) ? device : _.get(device, path)
  const deviceStr = JSON.stringify(part, null, 2)

  return <pre><code>{deviceStr}</code></pre>
}

DeviceState.propTypes    = propTypes
DeviceState.defaultProps = defaultProps

export default DeviceState
