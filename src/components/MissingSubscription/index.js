import React, { PropTypes } from 'react'
import Button from 'zooid-button'

import styles from './styles.css'

const propTypes = {
  message: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func.isRequired,
}
const defaultProps = {}

const MissingSubscription = ({ message, onSubscribe }) => {
  const onClick = (event) => {
    event.preventDefault()
    onSubscribe()
  }

  return (
    <div>
      <h1>Missing Subscription</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttons}>
        <Button kind="primary" size="large" onClick={onClick}>CREATE SUBSCRIPTION</Button>
      </div>
    </div>
  )
}

MissingSubscription.propTypes    = propTypes
MissingSubscription.defaultProps = defaultProps

export default MissingSubscription
