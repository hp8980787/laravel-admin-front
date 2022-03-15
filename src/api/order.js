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

export function mothCountryOrders() {
    return request({
        url: '/orders/mothSales/country',
        method: 'get'
    })
}

export function orderStatistic(data){
    return request({
        url:'/orders/statistic',
        method:'get',
        params:data
       
    })
}
