import atob from 'atob'
import cookie from 'react-cookie'
import MeshbluHttp from 'browser-meshblu-http'
import { MESHBLU_HOST } from '../config/constants'

export function getMeshbluConfig() {
  const bearerToken = cookie.load('meshbluBearerToken')

  if (!bearerToken) return null

  const bearerTokenEnvelope = atob(bearerToken)
  const bearerTokenPieces   = bearerTokenEnvelope.split(':')

  return {
    uuid: bearerTokenPieces[0],
    token: bearerTokenPieces[1],
    hostname: MESHBLU_HOST,
    port: 443,
  }
}

export function getDevices(callback) {
  const meshbluConfig = getMeshbluConfig()
  const meshbluHttp = new MeshbluHttp(meshbluConfig)
  meshbluHttp.devices({ owner: meshbluConfig.uuid }, callback)
}
