

// 此文件夹一般由脚本输出，存放一个api请求对应的所有事件，每一个api对应一个文件

/*------------------------------------------------------------------------------------------

  这是一个apiAction的示例，在这可见，api-action的type[`fetchGetComments_REQUEST`等]是固定格式，因此
在actions/index.js里定义的api触发事件类型与这个要保持一致

------------------------------------------------------------------------------------------*/

// ------------------------------------
// fetchGetComments -- 抓取某篇文章的评论
// ------------------------------------
export const fetchGetComments = (payload = {}) => ({ type: 'fetchGetComments_REQUEST', ...payload })
export const fetchGetCommentsSuccess = (payload = {}) => ({ type: 'fetchGetComments_REQUEST_SUCCESS', ...payload })
export const fetchGetCommentsFailure = (payload = {}) => ({ type: 'fetchGetComments_REQUEST_FAILURE', ...payload })
