import axios from 'axios';
// import * as config from 'profile-config'
var qs = require('qs');

var host = "http://120.79.172.214:8666/";


export function getUrl (url) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        axios.get(url).then(response =>{
            resolve(response.data);
        },err =>{
            reject(err);
        }).catch(error => {
            console.log(error);
        })
    })
}

export function postUrl (url,param) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        var parameter = null;
        if( param != null){
            parameter = qs.stringify(param);
        }
        axios.post(url,parameter).then(response =>{
                resolve(response.data);
            },err =>{
                reject(err);
            }).catch(error => {
                console.log(error);
        })
    })
}



export function putUrl (url,param) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        var parameter = null;
        if( param != null){
            parameter = qs.stringify(param);
        }
        axios.put(url,parameter).then(response =>{
            resolve(response.data);
        },err =>{
            reject(err);
        }).catch(error => {
            console.log(error);
        })
    })
}

export function deleteUrl (url) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        axios.delete(url).then(response =>{
            resolve(response.data);
        },err =>{
            reject(err);
        }).catch(error => {
            console.log(error);
        })
    })

}
