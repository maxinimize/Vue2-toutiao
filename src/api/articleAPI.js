import request from '@/utils/request.js';

export const getArticleListAPI = (_page, _limit) => {
  return request.get('/articles', {
    params: {
      _page,
      _limit,
    },
  });
};
