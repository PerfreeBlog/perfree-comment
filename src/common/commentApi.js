import { ApiService } from './apiService.js'

export function pageByArticleIdApi(data) {
    return ApiService.post('/api/comment/pageByArticleId', data);
}

export function pageByTopPid(data) {
    return ApiService.post('/api/comment/pageByTopPid', data);
}

export function getLoginUserApi() {
    return ApiService.get('/api/getLoginUser');
}

export function submitCommentApi(data) {
    return ApiService.post('/api/comment/submitComment', data);
}
