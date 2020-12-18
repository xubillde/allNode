
import { createSelector } from 'reselect'


// ------------------------------------
// fetchGetComments -- 抓取某篇文章的评论
// ------------------------------------
export const selectFetchGetComments = () => state => state.fetchGetComments
export const selectFetchGetCommentsRes = () => createSelector(
  selectFetchGetComments(),
  fetchGetComments => fetchGetComments && fetchGetComments.response
)
export const selectFetchGetCommentsCount = () => createSelector(
  selectFetchGetComments(),
  fetchGetComments => fetchGetComments && fetchGetComments.count
)
export const selectFetchGetCommentsState = () => createSelector(
  selectFetchGetComments(),
  fetchGetComments => fetchGetComments && fetchGetComments.fetching
)
export const fetchGetCommentsSuccess = state => (selectFetchGetComments()(state).count.success !== 0)
