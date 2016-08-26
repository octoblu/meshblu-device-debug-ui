import MeshbluHTTP from 'browser-meshblu-http'

import {getMeshbluConfig} from './auth-service'

export function verifyConfigureReceived(emitterUuid, callback) {
  const config = getMeshbluConfig()
  const meshblu = new MeshbluHTTP(config)

  meshblu.listSubscriptions({subscriberUuid: config.uuid}, (error, subscriptions) => {
    if (error) return callback(error)

    const found = _.some(subscriptions, {emitterUuid, type: 'configure.received'})
    if (found) return callback()

    callback(new Error('User is not subscribed to its own configure.received'))
  })
}
