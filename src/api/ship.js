import request from "@/utils/request"

export function store(data) {
    return request({
        url: '/ships',
        method: 'post',
        data
    })
}