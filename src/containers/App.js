import React, { PropTypes } from 'react'
import Authenticated from './Authenticated'
import Main from '../components/Main'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Authenticated>
        <Main>
          {this.props.children}
        </Main>
      </Authenticated>
    )
  }
}

App.propTypes = propTypes
