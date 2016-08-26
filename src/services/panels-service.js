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
