import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/orders',
        method: 'get',
        params: data
    })
}

export function todayOrders() {
    return request({
        url: '/orders/todaySales',
        method: 'get',
    })
}

export function mothCountryOrders() {
    return request({
        url: '/orders/mothSales/country',
        method: 'get'
    })
}

export function orderStatistic(data) {
    return request({
        url: '/orders/statistic',
        method: 'get',
        params: data

    })
}

export function itemsStore(data) {
    return request({
        url: '/order-items',
        method: 'post',
        data
    })
}
export function ship(data) {
    return request({
        url: '/ship',
        method: 'get',
        params: data
    })
}