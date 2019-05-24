import axios from "../config/axios";
export const getUploadToken = (params) => {
  return axios.get(`/web/public/getPictureUploadToken`, { params: params });
}
// 上传图片的接口
export const uploadImg = params => {
  return axios.post(`https://upload-z2.qiniup.com`, params)
}
