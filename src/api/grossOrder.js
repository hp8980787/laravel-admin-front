import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/gross-orders',
        method: 'get',
        params: data,
    });
}

export function update(data) {
    return request({
        url: `/gross-orders/${data['id']}`,
        method: 'put',
        data,
    })
}

export function record(data) {
    return request({
        url: '/gross-orders/record',
        method: 'post',
        data: { data },
    })
}

export function itemsStore(data) {
    return request({
        url: '/order-items',
        method: 'post',
        data
    })
}

export function itemsUpdate(data) {
    return request({
        url: `/order-items/${data['id']}`,
        method: 'put',
        data
    })
}

export function itemsDelete(data) {
    return request({
        url: `/order-items/${data['id']}`,
        method: 'delete'
    })
}