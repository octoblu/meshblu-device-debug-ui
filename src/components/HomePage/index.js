import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import DeviceDebug from '../../containers/DeviceDebug'

const propTypes = {
  deviceFirehose: PropTypes.object.isRequired,
}
const defaultProps = {}

const HomePage = ({ deviceFirehose }) => {
  return (
    <Page>
      <DeviceDebug deviceFirehose={deviceFirehose} />
    </Page>
  )
}

HomePage.propTypes    = propTypes
HomePage.defaultProps = defaultProps

export default HomePage
