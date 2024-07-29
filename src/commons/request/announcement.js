import http from './axios';

export function getAnnouncementAxios(params) {
    return new Promise((resolve, reject) => {
        http("get", '/basic/announcement/getAnnouncement',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}
export function updateAnnouncementAxios(params) {
    return new Promise((resolve, reject) => {
        http("get", '/basic/announcement/updateAnnouncement',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}
export function setAnnouncementAxios(params) {
    return new Promise((resolve, reject) => {
        http("post", '/basic/announcement/setAnnouncement',params).then(res => {
            resolve(res);
        }, error => {
            reject(error)
        })
    })
}