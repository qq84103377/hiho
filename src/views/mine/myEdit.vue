<template>
  <div class="mine-my-edit posR">
    <group class="mgb8">
      <cell title="头像" is-link class="cell-img" @click.native="isShowEdit = true">
        <div slot>
          <x-img :src="form.headImgPath || imgUrl" alt="请上传头像"></x-img>
        </div>
      </cell>
      <x-input title="用户名" text-align="right" disabled v-model="form.name"></x-input>
    </group>
    <group>
      <cell title="关于微信" class="cell-img" :value="form.wx"></cell>
      <cell title="手机号" class="cell-img" :value="form.phone"></cell>
      <!-- <cell title="更换手机号" is-link class="cell-img" :value="form.phone" @click.native="$router.push({path: '/mine/editTel',query:{phone: form.phone}})"></cell> -->
      <!-- <cell title="修改密码" is-link class="cell-img" @click.native="getShow('psd')"></cell> -->
    </group>
    <x-button class=" posA btn" @click.native="signOut = true">退出登录</x-button>
    <!-- 修改头像 -->
     <actionsheet v-model="isShowEdit" :menus="actionMenus" @on-click-menu="handleSelectType" show-cancel></actionsheet>
     <!-- 退出登录 -->
      <actionsheet v-model="signOut" :menus="signOutMenus" @on-click-menu="sign" show-cancel></actionsheet>
  </div>
</template>

<script>
  import {getH5UserInfo,saveH5UserHeadImg} from '@/api/mine.js'
  import {uploadImg,getUploadToken} from '@/api/upload.js'
  import md5 from 'js-md5';
  const qiNiuBaseUrl = 'https://image5.myjuniu.com/'
  const _env = process.env.NODE_ENV === "production" ? "pro" : "dev"
  export default {
    name: 'mineMyEdit',
    data() {
      return {
        isShow: false,
        isShowEdit: false,
        signOut: false,
        imgUrl: require('../../assets/icon/commom_pic-placeholder@3x.png'),
        actionMenus: {
          camera: '拍照',
          image: '从相册选择'
        },
        signOutMenus: {
          signOut: '退出'
        },
        form: {headImgPath: '', name: '', wx: '', phone: ''}
      }
    },
    methods: {
      // 退出
      sign(key) {
        if (key === 'signOut') {
           localStorage.removeItem('userInfo')
            this.$store.commit('setUserInfo',{})
            this.$store.commit('setAddressInfo', {})
            this.$router.replace('/login')
        }
      },
      getUserInfo () {
        let params= {
          id: this.$store.getters.userInfo.id
        }
        this.$vux.loading.show({
          text: 'Loading'
        })
        getH5UserInfo(params).then(res => {
          this.form = {
            headImgPath: res.data.headImgPath,
            name: res.data.name,
            wx: res.data.wx || '无',
            phone: res.data.phone
          }
          this.$vux.loading.hide()
        })
      },
      handleSelectType(key) {
        if (key === 'camera') {
            // 拍照
            let srcType = Camera.PictureSourceType.CAMERA;
            navigator.camera.getPicture(this.onSuccess, this.onFail,this.setOptions(srcType));
        }
        else if (key === 'image') {
            // 从相册选择
            let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            navigator.camera.getPicture(this.onSuccess, this.onFail,this.setOptions(srcType));
        }
      },
      setOptions(srcType) {
        return {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        }
      },
      // 失败
      onFail(message) {
          console.log('Failed because: ' + message);
      },
      // 成功
      onSuccess(imageUri) {
        console.log(imageUri,'调用成功了吗？')
        this.readFileFromUri(imageUri)
      },
      readFileFromUri(imgUri) {
        const _this = this;
        window.resolveLocalFileSystemURL(imgUri, async function success(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = async function (e) {
                    _this.handleFileChange(e)
                }
            })
        }, _this.onErrorResolveUrl)
      },
      async handleFileChange(e) {
          console.log('handleFileChange进来')
        const key = this.getImgKey()
            , token = await this.getToken()
            , formData = new FormData();
        let file = new Blob([e.target.result], {type: "image/jpg"});
        formData.append('file', file);
        formData.append('key', key);
        formData.append('token', token);
        this.uploadHeadImg(formData)
          console.log('handleFileChange出来')
      },
      uploadHeadImg(params) {
          console.log('uploadHeadImg进来')
          console.log(params)
        uploadImg(params)
        .then(res => {
            console.log(res)

            console.log('上传图片接口返回的：'+res.key)
          const headImg =qiNiuBaseUrl +  res.key;
          const userId = this.$store.getters.userInfo.id;
          this.updataUserInfo({
              path: headImg,
              userId: userId
          })
        })
          console.log('uploadHeadImg出来')

      },
      onErrorResolveUrl(message){
        console.log('Failed because: ' + message);
      },
      // 设置上传图片key
      getImgKey() {
        const storeId = this.$store.getters.userInfo.id
        const date = +new Date() + "";
        return storeId + "_" + _env + "_" + md5(storeId + date) +　".jpg";
      },
      getToken() {
        return getUploadToken()
        .then(res => {
            console.log('getUploadToken进来')
            console.log(res)
            return res.data;
        });
      },
      updataUserInfo(params) {
        this.$vux.loading.show({
          text: 'Loading'
        })
        saveH5UserHeadImg(params).then(res => {
            this.$vux.toast.text('修改成功');
            this.getUserInfo()
            this.$vux.loading.hide()
        });
        return
      },
      onCancel() {

      },
      onShow() {
        this.$refs['name-confirm'].setInputValue(this.infoData['userInfo']['userName'])
      },
    },
    created () {
      this.getUserInfo()
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
@import '../../assets/style/vars.less';
.mine-my-edit{
  background-color:@mine-color;
  .cell-img{
    img{
      height:64px;
      width:64px;
      border-radius: 50%;
    }
  }
  .btn{
    color:@red !important;
    border:none !important;
    width:335px !important;
    margin:0 20px;
    background-color:@white-bg !important;
    bottom:20px !important;

  }
  .comfirmbtn{
    bottom: 0 !important;
  }
  .edit-title{
    height:50px;
    line-height: 50px;
    font-weight:600;
  }
  .vux-popup-dialog.vux-popup-right{width:100% !important;}
}

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
