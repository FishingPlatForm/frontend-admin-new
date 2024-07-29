import http from './axios';

//获取 提现列表
export function getWithdrawListAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/fuser/admin/withdraw/list',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}
// 提现列表操作
export function putWithdrawApproveAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/fuser/admin/withdraw/approve',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}