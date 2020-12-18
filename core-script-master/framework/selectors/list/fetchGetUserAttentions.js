
import { createSelector } from 'reselect'


// ------------------------------------
// fetchGetUserAttentions -- 抓取用户关注
// ------------------------------------
export const selectFetchGetUserAttentions = () => state => state.fetchGetUserAttentions
export const selectFetchGetUserAttentionsRes = () => createSelector(
  selectFetchGetUserAttentions(),
  fetchGetUserAttentions => fetchGetUserAttentions && fetchGetUserAttentions.response
)
export const selectFetchGetUserAttentionsCount = () => createSelector(
  selectFetchGetUserAttentions(),
  fetchGetUserAttentions => fetchGetUserAttentions && fetchGetUserAttentions.count
)
export const selectFetchGetUserAttentionsState = () => createSelector(
  selectFetchGetUserAttentions(),
  fetchGetUserAttentions => fetchGetUserAttentions && fetchGetUserAttentions.fetching
)
export const fetchGetUserAttentionsSuccess = state => (selectFetchGetUserAttentions()(state).count.success !== 0)
