import http from './axios';

//控制台
export function loginAxios(param) {
    return new Promise((resolve, reject) => {
        http("post", '/fuser/admin/login',param).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}