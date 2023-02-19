import http from './axios';

//获取 所有资料审核列表
export function getFishpondListAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/fishpond/list',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}

//获取 待审核列表
export function getApprovelistFishpondListAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/fishpond/admin/approvelist',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}

//获取鱼塘资料审核 操作
export function putApproveAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/fishpond/admin/approve',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}