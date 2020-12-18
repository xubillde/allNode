
import { createSelector } from 'reselect'


// ------------------------------------
// fetchPostPosts -- 抓取文章
// ------------------------------------
export const selectFetchPostPosts = () => state => state.fetchPostPosts
export const selectFetchPostPostsRes = () => createSelector(
  selectFetchPostPosts(),
  fetchPostPosts => fetchPostPosts && fetchPostPosts.response
)
export const selectFetchPostPostsCount = () => createSelector(
  selectFetchPostPosts(),
  fetchPostPosts => fetchPostPosts && fetchPostPosts.count
)
export const selectFetchPostPostsState = () => createSelector(
  selectFetchPostPosts(),
  fetchPostPosts => fetchPostPosts && fetchPostPosts.fetching
)
export const fetchPostPostsSuccess = state => (selectFetchPostPosts()(state).count.success !== 0)
