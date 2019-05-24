<template>
    <div class="custom-body my-share">
        <div class="main-content">
            <span class="iconNH icon-share img"></span>
            <div class="box white-bg ">
                <div class="title fs16">邀请码</div>
                <x-button class="input" type="primary">{{code}}</x-button>
                <p class="fs12 center dark-gray mgt8">长按复制验证码</p>
                <div class="code icon-shareCode">
                    <qrcode :value="qrcodeImg" type="img" class="qrcode-img"></qrcode>
                </div>
                <p class="text fs16">扫一扫加入下载APP</p>
                <p class="fs14 look" @click.stop="$router.push('/mine/myShare/shareList')">查看邀请记录</p>
            </div>
        </div>
        <div class="footer">
            <wechat-share-bar :imgList="shareImgList" remark="">></wechat-share-bar>
        </div>
    </div>
</template>
<script>
    import {judgeInviteCode, createInviteCodeWithQRCode, addInviteCode, getQRCodeImg} from '@/api/mine.js'

    export default {
        data() {
            return {
                code: '',
                qrcodeImg: '',
                shareImgList: []
            }
        },
        methods: {
            createInviteCodeWithQRCode () {
                let paramss = {
                    code: this.code,
                    userId: this.$store.getters.userInfo.id
                }
                // 获取二维码
                createInviteCodeWithQRCode(paramss).then(res => {
                    if (res.code === 0) {
                        this.shareImgList = [res.data.shareImg]
                    }
                })
            },
            getQRCodeImg () {
                this.$vux.loading.show({text: 'Loading'})
                getQRCodeImg().then(res => {
                    if (res.code === 0) {
                        this.qrcodeImg = res.data
                        this.$vux.loading.hide()
                    }
                })
            },
            codePopShow() {
                this.code = Math.random().toString(36).substr(2, 6).toLocaleUpperCase()
                // 判重
                judgeInviteCode({code: this.code}).then(res => {
                    if (res.code == 1) {
                        this.code = Math.random().toString(36).substr(2, 6).toLocaleUpperCase()
                        return this.codePopShow()
                    } else if (res.code === 0) {
                        let params = {
                            code: this.code,
                            ownerUserId: this.$store.getters.userInfo.id,
                            vipLevelId: this.$store.getters.userInfo.vipLevelId
                        }
                        // 新增
                        addInviteCode(params).then(res => {
                            // 获取二维码
                            if (res.code == 0) {
                                this.createInviteCodeWithQRCode()
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.codePopShow()
            this.getQRCodeImg()
        }
    }
</script>
<style lang="less">
    .my-share {
        .qrcode-img {
            img {
                margin-top: 37px;
                height: 100%;
                width: 100%;
            }
        }
    }
</style>

<style scoped lang="less">
    @import '../../../assets/style/vars.less';

    .my-share {
        .main-content {
            padding: 0 0 15px;
            text-align: center;

            .img {
                margin: 0 auto -70px;
            }
            .box {
                text-align: center;
                padding: 80px 0 20px;
                margin: 0 15px;
                .title {
                    margin-bottom: 12px;
                }
                .input {
                    width: 174px;
                    height: 60px;
                }
                .code {
                    width: 222px;
                    height: 234px;
                    line-height: 234px;
                    margin: auto;
                }
                .text {
                    margin-bottom: 8px;
                    margin-top: 8px;
                }
                .look {
                    cursor: pointer;
                    text-decoration: underline;
                    color: @light-gray;
                }
            }
        }
        .btn {
            position: fixed;
            bottom: 0;
        }
    }
</style>

