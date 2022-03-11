import request from '@/utils/request'

export function index() {
    return request({
        url: '/orders',
        method: 'get',
    })
}

export function todayOrders() {
    return request({
        url: '/orders/todaySales',
        method: 'get',
    })
}

