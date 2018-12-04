import {postUrl} from "./api";

export function LoginPost(params) {
    return postUrl("admin/login",params);
}

export function LoginOut(params) {
    return postUrl("admin/loginout",params);
}
