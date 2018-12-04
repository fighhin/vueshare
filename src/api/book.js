import {postUrl,getUrl,putUrl,deleteUrl} from "./api";

export function Book(id,pId,name,author,desc,status,createTime) {
    this.id = id;
    this.pid = pId;
    this.bookName = name;
    this.author = author;
    this.description = desc;
    this.borrowStatus = status;
    this.createTime = createTime;
}

export function GetCategoryList() {
    return getUrl("v1/book/category");
}

export function GetBookOfCategoryList(params) {
    return getUrl("v1/book/detail/"+params.id);
}

export function GetBookContent(params) {
    return getUrl("v1/book/"+params.id);
}

export function AddItem(params) {
    return postUrl("v1/book/",params);
}

export function UpdateItem(params) {
    return putUrl("v1/book/",params);
}

export function DeleteItem(params) {
    return deleteUrl("v1/book/"+params);
}



