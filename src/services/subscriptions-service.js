import _ from 'lodash'
import MeshbluHTTP from 'browser-meshblu-http'

import { getMeshbluConfig } from './auth-service'

export function createSubscription({ emitterUuid, type }, callback) {
  const config = getMeshbluConfig()
  const meshblu = new MeshbluHTTP(config)

  const subscriberUuid = config.uuid

  meshblu.createSubscription({ emitterUuid, subscriberUuid, type }, callback)
}

export function verifySubscription({ emitterUuid, type }, callback) {
  const config = getMeshbluConfig()
  const meshblu = new MeshbluHTTP(config)

  meshblu.listSubscriptions({ subscriberUuid: config.uuid }, (error, subscriptions) => {
    if (error) {
      callback(error)
      return
    }

    const found = _.some(subscriptions, { emitterUuid, type })
    callback(null, found)
  })
}
