import {postUrl,getUrl,putUrl,deleteUrl} from "./api";


export function User(id,userName,userAccount,userPassword,sex,createTime) {
    this.id = id;
    this.userName = userName;
    this.userAccount = userAccount;
    this.userPassword = userPassword;
    this.sex = sex;
    this.createTime = createTime;
}


export function UserList(params) {
    return getUrl("alluser?page="+params.page+"&pageSize="+ params.pageSize+"&userName="+params.userName,params);
}

export function AddUser(params) {
    return postUrl("v1/user/1",params);
}

export function OneUser(params) {
    return getUrl("v1/user/"+params.id,params);
}
export function UpdateUser(params) {
    return putUrl("v1/user/"+params.id,params);
}

export function DeleteUser(params) {
    return deleteUrl("v1/user/"+params.id,params);
}
