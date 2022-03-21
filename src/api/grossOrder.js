import request from '@/utils/request'
import { dataTool } from 'echarts';

export function index(data) {
    return request({
        url: '/gross-orders',
        method: 'get',
        params: dataTool,
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