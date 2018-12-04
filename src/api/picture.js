import {postUrl} from "./api";


export function getPicture(params) {
    return postUrl("picture/list",params);
}

export function getPictureDetail(params) {
    return postUrl("picture/detail",params);
}

export function insertPicture(params) {
    return postUrl("picture/add",params);
}

export function deletePicture(params) {
    return postUrl("picture/delete",params);
}

export function deleteBatchPicture(params) {
    return postUrl("picture/batch",params);
}

export function editPicture(params) {
    return postUrl("picture/edit",params);
}



export function Picture(id='',pictureName='',uuid='',url='',description='',) {
    this.id = id;
    this.pictureName = pictureName;
    this.uuid = uuid;
    this.url = url;
    this.description = description;
}
