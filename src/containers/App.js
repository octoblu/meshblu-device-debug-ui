import React, { PropTypes } from 'react'
import Authenticated from './Authenticated'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Authenticated>
        <h1>Zooid App</h1>
        {this.props.children}
      </Authenticated>
    )
  }
}

App.propTypes = propTypes
