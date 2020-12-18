import { createSelector } from 'reselect'

export const selectCountState = () => state => state.count

export const selectCount = () => createSelector(
  selectCountState(),
  count => count.count
)

export const selectLight = () => createSelector(
  selectCountState(),
  count => count.light
)

export const selectLastUpdate = () => createSelector(
  selectCountState(),
  count => count.lastUpdate
)