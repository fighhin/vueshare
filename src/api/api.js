import axios from 'axios';
// import * as config from 'profile-config'
var qs = require('qs');
import * as prodConfig from '../api/prod-config'
import * as devConfig from '../api/dev-config'
import * as JudgeEnviroment from '../api/profile-config'

var host = "http://120.79.172.214:8666/";
var url = '';
var upload = '';

if (JudgeEnviroment.environment == "dev"){
    host = devConfig.host
    url = devConfig.url
    upload = devConfig.host;
}else {
    host = prodConfig.host
    url = prodConfig.url
    upload = prodConfig.host;

}

export const projectUrl = url;

export const uploadUrl = host;

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

export function getUrl (url,param) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        var parameter = null;
        if( param != null){
            parameter = qs.stringify(param);
        }
        axios.get(url,parameter).then(response =>{
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

export function deleteUrl (url,param) {
    url = host+url;
    return new Promise((resolve,reject) =>{
        var parameter = null;
        if( param != null){
            parameter = qs.stringify(param);
        }
        axios.delete(url,parameter).then(response =>{
            resolve(response.data);
        },err =>{
            reject(err);
        }).catch(error => {
            console.log(error);
        })
    })
}
