import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Card from 'zooid-card'
import Page from 'zooid-page'

import MissingSubscription from '../MissingSubscription'
import DeviceDebug from '../../containers/DeviceDebug'
import styles from './styles.css'

const propTypes = {
  error: PropTypes.object,
  missingSubscription: PropTypes.bool.isRequired,
  panels: PropTypes.array.isRequired,
  deviceFirehose: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
}
const defaultProps = {}

const HomePage = ({ error, missingSubscription, panels, deviceFirehose, onAdd, onRemove, onSubscribe }) => {
  const onClickAdd = (event) => {
    event.preventDefault()
    onAdd()
  }

  if (error) return (<Page error={error.message} />)

  if (missingSubscription) {
    return (
      <Page>
        <Card className={styles.card}>
          <MissingSubscription
            onSubscribe={onSubscribe}
            message='User is not subscribed to its own configure.received messages.' />
        </Card>
      </Page>
    )
  }

  const deviceDebugs = _.map(panels, (panelID) => {
    return (
      <DeviceDebug
        key={panelID}
        panelID={panelID}
        deviceFirehose={deviceFirehose}
        onRemove={onRemove} />
    )
  })

  return (
    <Page>
      {deviceDebugs}

      <div className={styles.actions}>
        <Button className={styles.topbutton} onClick={onClickAdd} kind="primary" size="large">Add</Button>
      </div>
    </Page>
  )
}

HomePage.propTypes    = propTypes
HomePage.defaultProps = defaultProps

export default HomePage
