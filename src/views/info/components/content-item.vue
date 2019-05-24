<template>
    <div class="content-item" @click="goTo()">
        <div class="box">
            <div class="box-title">
                <div class="fs16">{{info.mainTitle}}
                    <badge v-if="!info.hasRead" class="flag mgl5"></badge>
                </div>
                <div class="fs12 light-gray">{{info.createAt | dateFilter}}</div>
            </div>
            <div style="text-align: left" class="light-gray mgb6 fs12">{{info.subTitle}}</div>
            <div :class="['box-bottom',{'no-box':!info.mainContext&&!info.picUrl}]">
                <div class="posR" style="display: flex;align-items: center;">
                    <!--<div class="mask">{{info.mainContext.split(';')}}共2件商品</div>-->
                    <img v-if="info.picUrl" class="icon-img" :src="info.picUrl" alt="">
                    <div class="good fs13" v-if="totalGoods>1">共{{totalGoods}}件商品</div>
                    <!-- <div class="hot">热卖中</div> -->
                    <!-- <div class="preview" ↵>活动预告</div> "376e3fda894c4deda614c60baa5d368a"-->
                </div>
                <div class="content-right">
                    <div v-if="info.mainContext" class="fs13 mgb6" v-html="convertText()"></div>
                    <!--<div>{{info.subContext}}</div>-->
                    <div v-if="info.subContext" class="fs12 light-gray">{{info.subContext}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {setSingleHasRead} from '@/api/message'

    export default {
        name: 'contentItem',
        props: ['info'],
        created() {

        },
        computed: {
            totalGoods() {
                if (this.info.mainContext) {
                    return this.info.mainContext.split(';').length
                } else {
                    return 1
                }
            }
        },
        methods: {
            convertText() {
                //转换字符串换行符号
                return `<div>${this.info.mainContext.split(';')[0].replace(/\n/g, '<br>')}${this.info.mainContext.includes(';') ? '等商品' : ''}</div>`
            },
            goTo() {
                this.info.hasRead = true
                setSingleHasRead({uniqueFlag: this.info.uniqueFlag}).then(res => {
                    console.log(res.data, '设置单个消息已读');
                })
                if (this.$route.path == '/activity') return
                if (this.info.redirectType == 'ORDER') {
                    this.$router.push(`/orderDetail?id=${this.info.redirectReferId}`)
                } else if (this.info.redirectType == 'ACTIVITY') {
                    const type = this.checkTime()
                    this.$router.push(`/activityDetail?activityId=${this.info.redirectReferId}&type=${type}`)
                } else if (this.info.redirectType == 'REFUND') {
                    this.$router.push(`/afterSalesDetail?refundOrderId=${this.info.redirectReferId}`)
                }
            },
            checkTime() {
               let arr = this.info.remark.split(',')
                if(arr[0]*1 > new Date().getTime()){
                   //预告
                    return 1
                }else {
                   return 0
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .content-item {
        .mgl5 {
            margin-left: 5px;
        }
        .mgt6 {
            margin-top: 6px;
        }
        .mgl12 {
            margin-left: 12px;
        }
        .flag {
            width: 7px;
            height: 7px;
            padding: 0 !important;
            border-radius: 50% !important;
        }
        .box {
            margin: 12px 10px 0;
            background-color: #fff;
            border-radius: 4px;
            padding: 12px 16px;
            .box-title {
                display: flex;
                justify-content: space-between;
                height: 22px;
                line-height: 22px;
            }
            .box-bottom {
                display: flex;
                justify-content: flex-start;
                background-color: #FAFAFA;
                border-radius: 4px;
                .content-right {
                    text-align: left;
                    word-break: break-all;
                    padding: 8px 12px;
                }
                .icon-img {
                    width: 82px;
                    height: 82px;
                    border-radius: 4px;
                }
                .good {
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(0, 0, 0, .6);
                    text-align: center;
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    border-radius: 0 0 4px 4px;
                    color: #fff;
                }
                .hot {
                    width: 46px;
                    margin-top: -26px;
                    margin-left: -4px;
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    font-size: 10px;
                    background-color: #FCEFF2;
                    color: #F7406D;
                    border-radius: 2px;
                }
                .preview {
                    width: 56px;
                    margin-top: -26px;
                    margin-left: -4px;
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    font-size: 10px;
                    background-color: #EFEFFF;
                    color: #6262E6;
                    border-radius: 2px;
                }
                &.no-box {
                    background-color: #fff;
                    .content-right {
                        margin: 0;
                    }
                }
            }
            .mask {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 30px;
                width: 100%;
                background: rgba(0, 0, 0, .6);
                color: #fff;
                font-size: 13px;
                text-align: center;
                line-height: 30px;
            }
        }
    }

</style>
