import {postUrl} from "./api";

export function GetUserInfo(params) {
    return postUrl("admin/attr",params);
}

export function SavePwd(params) {
    return postUrl("admin/save_psw",params);
}
