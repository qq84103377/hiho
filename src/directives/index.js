
// 默认图片
export const defaultImg = value => {
    if (!value) {
        return;
    }
    value.onerror = function () {
        value.src = 'static/img/commom_pic-placeholder@3x.png';
    }
    value.src = (!value.src)?'static/img/icon/commom_pic-placeholder@3x.png':value.src;
}
