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

export function update(data) {
    return request({
        url: `/storehouses/${data.id}`,
        method: 'put',
        data
    })
}

export function destroy(id) {
    return request({
        url: `/storehouses/${id}`,
        method: 'delete',

    })
}