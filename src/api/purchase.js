import request from "@/utils/request"

export function index(data) {
    return request({
        url: '/purchases',
        method: 'get',
        params: data
    })
}
export function store(data) {
    return request({
        url: '/purchases',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: `/purchases/${data['id']}`,
        method: 'put',
        data
    })
}

export function completed(id) {
    return request({
        url: `/purchases/completed/${id}`,
        method: 'put',
    })
}