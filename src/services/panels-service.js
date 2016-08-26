import uuid from 'uuid'

export function addPanel() {
  const panels = getPanels()
  panels.push(uuid.v1())
  window.localStorage.setItem('panels', JSON.stringify(panels))
}

export function getPanels() {
  const panelsStr = window.localStorage.getItem('panels')
  if (!panelsStr) return []

  return JSON.parse(panelsStr)
}

export function getPanelInfo(panelID) {
  const panelStr = window.localStorage.getItem(`panel:${panelID}`)
  if (!panelStr) return {name: '', deviceUUID: '', path: ''}

  return JSON.parse(panelStr)
}

export function setPanelInfo(panelID, newPanelInfo) {
  const oldPanelInfo = getPanelInfo(panelID)
  const panelInfo = _.assign(oldPanelInfo, newPanelInfo)

  const panelInfoStr = JSON.stringify(panelInfo)
  window.localStorage.setItem(`panel:${panelID}`, panelInfoStr)
}
