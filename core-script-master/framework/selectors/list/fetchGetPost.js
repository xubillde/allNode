
import { createSelector } from 'reselect'


// ------------------------------------
// fetchGetPost -- 抓取某篇文章
// ------------------------------------
export const selectFetchGetPost = () => state => state.fetchGetPost
export const selectFetchGetPostRes = () => createSelector(
  selectFetchGetPost(),
  fetchGetPost => fetchGetPost && fetchGetPost.response
)
export const selectFetchGetPostCount = () => createSelector(
  selectFetchGetPost(),
  fetchGetPost => fetchGetPost && fetchGetPost.count
)
export const selectFetchGetPostState = () => createSelector(
  selectFetchGetPost(),
  fetchGetPost => fetchGetPost && fetchGetPost.fetching
)
export const fetchGetPostSuccess = state => (selectFetchGetPost()(state).count.success !== 0)
