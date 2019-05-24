<template>
    <div class="refund-detail custom-body">
        <div class="main-content">
            <!--商品信息-->
            <group>
                <cell class="good-detail" :border-intent="false">
                    <x-img slot="icon" class="goods-img" :src="params.info.goodsPicture"></x-img>
                    <div class="good-msg" slot="title">
                        <div class="goods-name">{{params.info.goodsName}}</div>
                        <div class="fs12 dark-gray pdb4">款式<span class="pdl4">{{params.info.goodsStyle}}</span></div>
                        <div class="fs12 dark-gray pdb4">款号<span class="pdl4">{{params.info.goodsStyleNo}}</span></div>
                        <div>
                            <x-button class="tag-btn select-size-btn" mini>{{params.info.specName}}</x-button>
                        </div>
                    </div>
                    <div class="right-content">
                        <div></div>
                        <p class="goods-price">￥{{params.info.price}}</p>
                    </div>
                </cell>
                <div class="order-remark">
                    <div class="fs12">备注：{{params.info.remark}}</div>
                    <!--<div><i class="iconNH icon-cart-edit"></i></div>-->
                </div>
            </group>
            <!--支付信息-->
            <group>
                <cell :border-intent="false">
                    <div slot="title">
                        <span>退款金额：¥ </span><input type="text" class="price-input" v-model="refundMoney"  @input='getToFixed'>
                    </div>
                </cell>
                <div class="refund-tip border-top">最多可退￥{{params.info.price*1 +
                    params.info.freight*1}}，包含运费￥{{params.info.freight}}
                </div>
                <cell :border-intent="false">
                    <div slot="title">退款原因</div>
                </cell>
                <div class="refund-reason-list">
                    <x-button @click.native="selectReason(reason)" v-for="(reason,reasonIndex) in reasonList"
                            :key="reasonIndex" :class="['tag-btn mgr4',{active:reason.isActive}]" mini>{{reason.text}}
                    </x-button>
                </div>
                <div>
                    <x-textarea :disabled="!reasonList[2].isActive" class="your-reason" :max="200"
                                placeholder="可以在这里具体描述退款原因" v-model="refundRemark"></x-textarea>
                </div>
                <div class="img-list-content">
                    <div aspectratio w-345-64>
                        <div class="img-list" aspectratio-content>
                            <div v-for="(item,index) in picList" :key="index" class="item">
                                <i @click="picList.splice(index,1)" class="icon-close close"></i>
                                <x-img :src="item"></x-img>
                            </div>
                            <!--<div class="item">-->
                            <!--<i @click="picList.splice(index,1)" class="icon-close close"></i>-->
                            <!--<img src="../../../assets/img/aa.png" alt="">-->
                            <!--</div>-->
                            <div @click="isShowEdit=true" class="item">
                                <img src="@/assets/icon/commom_add-photo@2x.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </group>
            <group>
                <cell :border-intent="false">
                    <div slot="title" class="fs12 light-gray">平台同意退货后，请按以下地址退货并且填入退款物流号</div>
                </cell>
                <cell :border-intent="false">
                    <i slot="icon" class="icon-address iconNH mgr8"></i>
                    <div slot="title">
                        <p class="pdb4">{{params.info.receiverInfo.name}}：{{params.info.receiverInfo.phone}}</p>
                        <p class="fs12 light-gray">{{params.info.receiverInfo.address}}</p>
                    </div>
                </cell>
            </group>
            <div v-transfer-dom>
            <!--上传图片-->
            <actionsheet v-model="isShowEdit" :menus="actionMenus" @on-click-menu="handleSelectType"
                        show-cancel></actionsheet>
            </div>
        </div>
        
        <!--底部操作栏 -->
        <div class="footer">
            <div>
                <x-button @click.native="applyRefund" type="primary">申请退款 ¥{{(refundMoney*1).toFixed(2)}}</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {applyRefundH5, checkIfLastRefundH5} from '@/api/order'
    import {uploadImg, getUploadToken} from '@/api/upload.js'
    import md5 from 'js-md5';
    import {TransferDomDirective as TransferDom, PopupPicker} from 'vux'

    const qiNiuBaseUrl = 'https://image5.myjuniu.com/'
    const _env = process.env.NODE_ENV === "production" ? "pro" : "dev"
    export default {
        name: 'orderDetail',
        directives: {
            TransferDom
        },
        data() {
            return {
                picList: [],
                isShowEdit: false,
                actionMenus: {
                    camera: '拍照',
                    image: '从相册选择'
                },
                refundNote: '未收到货品',
                refundRemark: '',
                isRefundVisible: false,
                params: {},
                refundMoney: 0,
                reasonList: [{text: '未收到货品', isActive: true}, {text: '操作错误', isActive: false}, {
                    text: '其他原因',
                    isActive: false
                }]
            }
        },
        filters: {
            priceCurrency (value, _currency, decimals) {
            let temp_amount = ""
            if(/[^\- \d.]/g.test(value)){//替换非数字字符 /[^\d]/g
                temp_amount = value.replace(/[^\- \d.]/g,'');
                value = temp_amount
            }
            value = (value*1).toFixed(2)
            console.log(value, 'filter')
            return value
          }
        },
        watch: {
            refundMoney(v) {
                if ((v * 1) >= (this.params.info.price*1 + this.params.info.freight * 1)) {
                    this.refundMoney = (this.params.info.price*1 + this.params.info.freight * 1).toFixed(2)
                } else if (v == '') {
                    this.refundMoney = 0
                }
            }
        },
        methods: {
            toPrice (e, _currency, decimals) {
                let reg = /^[0-9]+\.?(\d{0,1})?$/
                if (!reg.test(e.target.value + '')) {
                    e.preventDefault()
                }
                this.refundMoney = e.target.value
            },
            getToFixed (e) {
                let reg = /\d+\.?\d{0,2}/
                // if (!reg.test(e.target.value + '')) {
                //     e.preventDefault()
                // }
                this.refundMoney = reg.exec(this.refundMoney) == null ? 0 : reg.exec(this.refundMoney)[0]
                console.log(this.refundMoney,'value')
            },
            handleSelectType(key) {
                if (key === 'camera') {
                    // 拍照
                    let srcType = Camera.PictureSourceType.CAMERA;
                    navigator.camera.getPicture(this.onSuccess, this.onFail, this.setOptions(srcType));
                }
                else if (key === 'image') {
                    // 从相册选择
                    let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                    navigator.camera.getPicture(this.onSuccess, this.onFail, this.setOptions(srcType));
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
                console.log(imageUri, '调用成功了吗？')
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
                const key = this.getImgKey()
                    , token = await this.getToken()
                    , formData = new FormData();
                let file = new Blob([e.target.result], {type: "image/jpg"});
                formData.append('file', file);
                formData.append('key', key);
                formData.append('token', token);
                this.uploadHeadImg(formData)
            },
            onErrorResolveUrl(message) {
                console.log('Failed because: ' + message);
            },
            // 设置上传图片key
            getImgKey() {
                const storeId = this.$store.getters.userInfo.id
                const date = +new Date() + "";
                return storeId + "_" + _env + "_" + md5(storeId + date) + ".jpg";
            },
            getToken() {
                return getUploadToken()
                    .then(res => {
                        return res.data;
                    });
            },
            uploadHeadImg(params) {
                uploadImg(params)
                    .then(res => {
                        console.log('上传图片接口返回的：' + res.key)
                        this.picList.push(qiNiuBaseUrl + res.key);
                        // const userId = this.$store.getters.userInfo.id;
                        // this.updataUserInfo({
                        //     headImg,
                        //     userId
                        // })
                    })
            },


            applyRefund() {
                for (let i = 0; i < this.reasonList.length; i++) {
                    if (this.reasonList[i].isActive && i != 2) {
                        this.refundNote = this.reasonList[i].text
                        break
                    } else {
                        this.refundNote = this.refundRemark
                    }
                }
                if (this.refundMoney == 0) return this.$vux.toast.text('退款金额不能为0')
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    orderId: this.params.info.orderId,
                    orderSpecId: this.params.info.id,
                    refundAmount: (this.refundMoney*1).toFixed(2),
                    refundType: this.params.type,
                    refundNote: this.refundNote,
                    refundPicList: this.picList,
                    payMethod: this.params.info.payMethod
                }
                // console.log(params, '退款参数');
                applyRefundH5(params).then(res => {
                    console.log(res);
                    this.$store.commit('setSalesListType','WAIT_AGREE')
                    this.$router.replace('/afterSalesList')
                })
            },
            selectReason(reason) {
                this.reasonList.forEach(v => {
                    v.isActive = false
                })
                reason.isActive = true
            },
            test() {
                console.log('点击了')
            }
        },
        created() {
            console.log(this.$route.query);
            this.params = this.$route.query
            checkIfLastRefundH5({orderSpecId: this.params.info.orderSpecId}).then(res => {
                if (!res.data) this.params.info.freight = 0
                this.refundMoney = (this.params.info.price*1 + this.params.info.freight * 1).toFixed(2)
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../../assets/style/vars.less';

    .refund-detail {
        .weui-cells {
            margin-top: 8px !important;
        }

        .good-detail {
            align-items: stretch;
        }
        .tag-btn.select-size-btn {
            background-color: @gray-white-bg !important;
        }
        .refund-reason-list {
            padding: 0 16px;
            .weui-btn + .weui-btn {
                margin-top: 0;
                margin-bottom: 16px;
            }
        }
        .refund-input {
            .weui-label {
                width: auto !important;
            }
            input {
                font-size: inherit !important;
            }
        }
        // .footer {
        //     .weui-btn {
        //         margin: 0;
        //         height: 50px;
        //         font-size: 16px;
        //     }
        // }
    }


</style>

<style rel="stylesheet/scss" lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .refund-detail {
        .main-content{
            .address-logo {
            display: block;
            width: 14px;
            margin-right: 8px;
        }
        .brand-logo {
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        .good-msg {
            padding-right: 15px;
            .goods-name {
                font-size: 13px;
                min-height: 40px;
                vertical-align: top;
                padding-bottom: 8px;
            }
        }
        .goods-img {
            display: block;
            width: 82px;
            height: 82px;
            margin-right: 10px;
        }
        .right-content {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            .goods-price {
                font-size: 14px;
                color: @red;
            }
        }
        .order-remark {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            margin: 0 16px 12px;
            padding: 6px 8px;
            color: @light-gray;
            background-color: @gray-white-bg;
            .iconNH {
                margin-left: 5px;
            }
        }
        .refund-tip {
            font-size: 12px;
            padding: 0 16px;
            line-height: 36px;
            color: @brown;
            background: #FFF7E8;
            .border-top
        }
        .your-reason {
            height: 90px;
            font-size: 14px;
            margin: 0 16px 16px;
            color: @blue-gray;
            background: @gray-white-bg;
        }
        [w-345-64] {
            width: 345px;
        }
        [w-345-64] {
            aspect-ratio: '345:64';
        }
        .img-list-content {
            margin-top: -6px;
            padding: 0 16px 16px;
            .img-list {
                display: flex;
                margin-bottom: 15px;
                .item {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    padding-right: 0;
                    margin-right: 6px;
                    &:nth-child(5n) {
                        margin-right: 0;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .close {
                        background-color: rgba(0, 0, 0, .2);
                        border-radius: 50%;
                        position: absolute;
                        right: -5px;
                        top: -5px;
                        width: 13px;
                        height: 13px;
                    }
                }
            }
        }
        }
    .price-input{
        font-size:16px;
    }
        // .footer {
        //     position: fixed;
        //     left: 0;
        //     bottom: 0;
        //     width: 100vw;
        //     height: 50px;

        // }

    }

</style>
