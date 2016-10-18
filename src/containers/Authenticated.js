import url from 'url'
import React, { Component } from 'react'
import Spinner from 'zooid-spinner'

import { OAUTH_CLIENT_ID, OAUTH_PROVIDER_URI } from 'config'
import { fetchOctobluUser } from '../services/auth-service'

export default class Authenticated extends Component {
  state = {
    octobluUser: null
  }

  componentDidMount() {
    fetchOctobluUser((error, octobluUser) => {
      if(error || !octobluUser) {
        return this.redirectToLogin()
      }
      this.setState({ octobluUser })
    })
  }

  buildAuthenticateRedirectUri() {
    const {protocol,hostname,port} = window.location
    const pathname = '/auth/callback'
    const query = {
      redirect_uri: this.buildRedirectUri()
    }

    return url.format({protocol,hostname,port,pathname,query})
  }

  buildRedirectUri() {
    const {pathname,query} = url.parse(window.location.href)

    return url.format({pathname,query})
  }

  redirectToLogin() {
    const {protocol,host,port} = url.parse(OAUTH_PROVIDER_URI)
    const uri = url.format({
      protocol: protocol,
      host: host,
      port: port,
      pathname: '/authorize',
      query: {
        client_id: OAUTH_CLIENT_ID,
        redirect_uri: this.buildAuthenticateRedirectUri(),
        response_type: 'token'
      }
    })

    window.location = uri
  }

  render() {
    const { octobluUser } = this.state
    const { children }    = this.props

    if (!octobluUser) return <Spinner size="large"/>
    return <div>{children}</div>
  }
}
