import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Page from 'zooid-page'

import DeviceDebug from '../../containers/DeviceDebug'
import styles from './styles.css'

const propTypes = {
  error: PropTypes.object,
  deviceFirehose: PropTypes.object.isRequired,
  panels: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
const defaultProps = {}

const HomePage = ({ error, panels, deviceFirehose, onAdd, onRemove }) => {
  const onClickAdd = (event) => {
    event.preventDefault()
    onAdd()
  }

  const errorStr = _.get(error, 'message')
  if (!_.isEmpty(errorStr)) return <Page error={errorStr} />

  const deviceDebugs = _.map(panels, (panelID) => {
    return (<DeviceDebug key={panelID} panelID={panelID} deviceFirehose={deviceFirehose} onRemove={onRemove} />)
  })

  return (
    <Page>
      {deviceDebugs}

      <div className={styles.actions}>
        <Button onClick={onClickAdd} kind="primary" size="large">Add</Button>
      </div>
    </Page>
  )
}

HomePage.propTypes    = propTypes
HomePage.defaultProps = defaultProps

export default HomePage
