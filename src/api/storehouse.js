import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/storehouses',
        method: 'get',
        params: data
    })
}

export function create(data) {
    return request({
        url: '/storehouses',
        method: 'post',
        params: data
    })
}