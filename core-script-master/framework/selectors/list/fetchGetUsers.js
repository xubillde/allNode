
import { createSelector } from 'reselect'


// ------------------------------------
// fetchGetUsers -- 抓取用户
// ------------------------------------
export const selectFetchGetUsers = () => state => state.fetchGetUsers
export const selectFetchGetUsersRes = () => createSelector(
  selectFetchGetUsers(),
  fetchGetUsers => fetchGetUsers && fetchGetUsers.response
)
export const selectFetchGetUsersCount = () => createSelector(
  selectFetchGetUsers(),
  fetchGetUsers => fetchGetUsers && fetchGetUsers.count
)
export const selectFetchGetUsersState = () => createSelector(
  selectFetchGetUsers(),
  fetchGetUsers => fetchGetUsers && fetchGetUsers.fetching
)
export const fetchGetUsersSuccess = state => (selectFetchGetUsers()(state).count.success !== 0)
