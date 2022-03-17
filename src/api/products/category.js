import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/products/category',
        method: 'get',
        params: data
    })
}

export function store(data) {
    return request({
        url: '/products/categories/',
        method: 'post',
        data
    })
}

export function update(data){
    return request({
        url:'/products/categories',
        method:'put',
        data
    })
}
export function destroy(id){
    return request({
        url:`/products/categories/${id}`,
        method:'delete',
    })
}