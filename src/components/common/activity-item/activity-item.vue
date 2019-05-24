<template>
    <div class="activity-item">
        <div v-if="activityInfo.stockSum == 0" class="mask">
            <div class="mask-tip"></div>
        </div>
        <div v-if="activityInfo.status == '1'" class="mask">
            <div class="mask-tip goods-down">
                <div class="goods-tip">已下架</div>
            </div>
        </div>
        <div v-if="activityInfo.isEnd == '1'" class="mask">
            <div class="mask-tip act-end">
            </div>
        </div>
        <div class="main-msg">
            <div class="brand-img" @click="goto"><img :src="activityInfo.brandPicPath"  alt=""/></div>
            <div class="content-main">
                <div class="content-top black">
                    <div class="brand-title fl">{{activityInfo.brandName || brandName}}</div>
                    <div class="fr">
                        <slot name="badge"></slot>
                    </div>
                </div>
                <div :class="['content-center',{'fold-text':type=='ACTIVITY'&&!isShowAll}]">
                    <template v-for="item in activityInfo.remark.split('\n') || activityInfo.goodsSpec.split('\n')">
                        <span>{{item}}</span><br>
                    </template>
                    <!--<p v-for="item in activityInfo.remark.split('\n') || activityInfo.goodsSpec.split('\n')">-->
                        <!--{{item}}</p>-->
                </div>
                <div v-if="type=='ACTIVITY'&&(activityInfo.remark.split('\n').length>4||activityInfo.remark.length>100)" class="show-all blue" @click="isShowAll=!isShowAll">{{isShowAll?'收起':'展开'}}全文</div>
                <slot name="price"></slot>
                <ul>
                    <li :class="['cover-bg-img',{'four-mode':activityInfo.picPathsList.length<=4},{'nine-mode':activityInfo.picPathsList.length>4}]"  @click="showImg(index)" v-for="(item,index) in activityInfo.picPathsList"
                        :style="{backgroundImage:'url(' + item.src + ')'}">
                    </li>
                </ul>
                <slot name="countdown"></slot>
                <div class="action-group">
                    <div class="icon-group">
                        <i class="iconNH icon-download-img active" @click="isShowSaving = true"></i>
                        <i @click="focus"
                           :class="['iconNH','icon-focus',{'active':activityInfo.hasNotice=='1'}]"></i>
                    </div>
                    <div class="">
                        <slot name="btn"></slot>
                        <!--<x-button class="w82 has-radius" mini type="primary"-->
                                  <!--@click.native="$router.push({name:'activityTransmit',params:{type:type=='GOODS'?1:0,info:activityInfo}})">-->
                            <!--转发-->
                        <!--</x-button>-->
                    </div>
                </div>
            </div>
        </div>
        <div>
            <slot name="shopcar"></slot>
        </div>
        <div v-transfer-dom>
            <confirm v-model="isShowSaving"
                     dialog-transition=""
                     title="提示"
                     @on-confirm="savePic">
                <p style="text-align:center;">您确定要保存图片吗？</p>
            </confirm>
        </div>
    </div>
</template>


<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {notice} from '@/api/activity'

    export default {
        directives: {
            TransferDom
        },
        name: "activity-item",
        props: ['activityInfo', 'type','brandName'],
        data() {
            return {
                isSavingPic: false,
                isShowSaving: false,
                isShowAll:false
            }
        },
        mounted() {
            // document.addEventListener("keyup", this.close, true);
        },
        methods: {
            //一键存图
            savePic() {
                if (!this.isSavingPic) {
                    this.isSavingPic = true
                    this.$vux.loading.show({
                        text: '存图中'
                    })
                    var _this = this;
                    let saveImages = []
                    this.activityInfo.picPathsList.forEach(item => {
                        saveImages.push(item.src)
                    })
                    Wechat.share({
                        message: {
                            title: "",
                            description: "",
                            thumb: "",
                            mediaTagName: "",
                            messageExt: "SaveImg",
                            messageAction: "<action>dotalist</action>",
                            media: {
                                type: Wechat.Type.IMAGE,
                                image: saveImages
                            }
                        },
                        scene: Wechat.Scene.TIMELINE  // share to Timeline
                    }, function () {
                        _this.isSavingPic = false
                        _this.$vux.loading.hide()
                        _this.$vux.toast.show({
                            text: '存图成功',
                        })
                    }, function (reason) {
                        _this.isSavingPic = false
                        _this.$vux.loading.hide()
                        _this.$vux.toast.show({
                            text: '存图失败',
                        })
                    });
                }

            },
            goto() {
                if(this.activityInfo.startTime&&this.$route.path=='/follow'){
                    this.$router.push(`/activityDetail?activityId=${this.activityInfo.id}&type=${this.activityInfo.isLive?'0':'1'}`)
                }
            },
            //按返回键触发关闭图片
            close() {
                // alert('监听本页面返回键')
                this.$refs.previewer.close()
            },
            //关闭图片时改状态
            // closeImg(){
            //     this.$store.commit('setShowImgState', false)
            // },
            showImg(index) {
                this.$store.commit('setPreviewerInfo', {
                    imgList: this.activityInfo.picPathsList,
                    currentIndex: index,
                    time: new Date().getTime()
                })
            },
            focus() {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    action: this.activityInfo.hasNotice == '1' ? 0 : 1,
                    type: this.type,
                    attrId: this.activityInfo.id
                }
                notice(params).then(res => {
                    this.activityInfo.hasNotice = this.activityInfo.hasNotice == '1' ? '0' : '1'
                    this.$vux.toast.show({
                        type: 'text',
                        text: this.activityInfo.hasNotice == '1' ? '关注成功' : '取消关注'
                    })
                    this.$emit('focus')
                })
            }
        },
        created(){
            console.log(this.type)
        }
    }
</script>
<style lang="less">
    .activity-item {

    }
</style>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .activity-item {
        margin-top: 8px;
        padding: 20px;
        background: #fff;
        position: relative;
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, .5);
            z-index: 99;
            .mask-tip {
                padding: 0 11px;
                width: 84px;
                height: 62px;
                background: rgba(0, 0, 0, .5);
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: url("../../../assets/icon/sign-soldout@2x.png") no-repeat;
                background-size: cover;
                &.goods-down {
                    background: none;
                    width: auto;
                    height: auto;
                }
                &.act-end{
                    height: 84px;
                    background: url("../../../assets/icon/sign-time-over@3x.png") no-repeat;
                    background-size: cover;
                }
                .goods-tip {
                    padding: 10px;
                    background: rgba(0, 0, 0, .5);
                    color: #fff;
                }
            }
        }
        .main-msg {
            display: flex;
            .brand-img {
                flex: 0 0 42px;
                height: 42px;
                margin-right: 12px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .content-main {
                flex: 1;
                .content-top {
                    font-size: 15px;
                    overflow: hidden;
                    .brand-title {
                        line-height: 28px;
                    }
                    .badge1, .badge2 {
                        display: inline-block;
                        padding: 0 8px;
                        line-height: 20px;
                        font-size: 10px !important;
                    }
                    .badge1 {
                        margin-right: 4px;
                    }
                    .badge2 {
                        background: #FCEFF2;
                        color: #F7406D;
                        &.preview {
                            background: #EFEFFF;
                            color: #6262E6;
                        }
                    }
                }
                .content-center {
                    margin-top:5px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;


                }
                .fold-text{
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                }
                .show-all {
                    font-size: 12px;
                    margin-top: 4px;
                }
                .price {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 6px;
                    .sale-price {
                        font-size: 18px;
                    }
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 14px;
                    li.four-mode {

                        width: 123px;
                        height: 123px;
                        margin-bottom: 6px;
                        margin-right: 6px;
                    }
                    li.nine-mode {
                        width: 80px;
                        height: 80px;
                        margin-bottom: 6px;
                        margin-right: 6px;
                    }
                }
                .action-group {
                    margin:12px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .icon-group {
                        display: flex;
                        align-items: center;
                        height: 32px;
                    }
                }
            }
        }
    }
</style>
