import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {AppBar, AppBarPrimary} from 'zooid-ui'
import 'zooid-ui/dist/style.css'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const Main = ({ children }) => {
  return (
    <div>
      <AppBar >
        <AppBarPrimary className={styles.appBarPrimary}>
          <Link to="/" className={styles.appBarPrimaryLink}>Meshblu Device Debug UI</Link>
        </AppBarPrimary>
      </AppBar>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

Main.propTypes    = propTypes
Main.defaultProps = defaultProps

export default Main
