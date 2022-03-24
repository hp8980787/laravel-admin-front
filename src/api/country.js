import request from "@/utils/request"

export function index(data) {
    return request({
        url: '/countries',
        method: 'get',
        params: data
    })
}