import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/products',
        method: 'get',
        params: data,
    })
}