import MeshbluHTTP from 'browser-meshblu-http'

import {getMeshbluConfig} from './auth-service'

export function createConfigureReceived(emitterUuid, callback) {
  const config = getMeshbluConfig()
  const meshblu = new MeshbluHTTP(config)

  const subscriberUuid = config.uuid
  const type = 'configure.received'

  meshblu.createSubscription({emitterUuid, subscriberUuid, type}, callback)
}

export function verifyConfigureReceived(emitterUuid, callback) {
  const config = getMeshbluConfig()
  const meshblu = new MeshbluHTTP(config)

  meshblu.listSubscriptions({subscriberUuid: config.uuid}, (error, subscriptions) => {
    if (error) return callback(error)

    const found = _.some(subscriptions, {emitterUuid, type: 'configure.received'})
    callback(null, found)
  })
}
