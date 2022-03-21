import request from "@/utils/request"

export function activeCountry(data) {
    return request({
        url: '/activeCountries',
        method: 'get',
        params: data
    })
}