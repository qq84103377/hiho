<template>
    <div class="custom-body activity-transmit">
        <div class="header">
            <i class="close icon-close" @click="$router.go(-1)"></i>
            <div class="title black">转发{{$route.query.type?'商品':'活动'}}</div>
        </div>
        <div class="main-content">
            <x-textarea class="content black" :rows="5" v-model="info.remark"></x-textarea>
            <div v-if="$route.query.type" class="price-group gray-white-bg">
                <div class="price-item black fs12"><span class="bold">文案中显示现价 </span><span class="fs10 blue-gray">现价=销售价+(标准代购价+额外加价)</span>
                    <check-icon type="plain" class="fr" :value.sync="showPrice"></check-icon>
                </div>
                <div v-show="showPrice" class="price-item black fs16">
                    <x-input type="number" text-align="right" placeholder="请输入代购价" placeholder-align="right" title="代购价"
                             v-model.trim="purchPrice"></x-input>
                    <checker v-model="addPurchPrice" type="radio" default-item-class="select-item blue-gray-bg light-gray"
                     selected-item-class="is-active">
                        <checker-item v-for="(item,index) in priceList" :key="index" :value="item.purchaseCost">+￥{{item.purchaseCost}}
                        </checker-item>
                    </checker>
                </div>
            </div>
            <tab :scroll-threshold="3" custom-bar-width="44px" :line-width="2">
                <tab-item selected @on-item-click="allImg">多图</tab-item>
                <tab-item @on-item-click="firstImg">首图</tab-item>
                <tab-item @on-item-click="compose">合成图</tab-item>
            </tab>
            <div v-if="curType == 'allImg'"><i :class="['iconNH icon-select mgr8 mgt2',{'is-active':isAll}]" @click="selectAll"></i>全选</div>
            <div v-else-if="curType == 'compose'" class="fs10 light-gray">转发时将按照示例图样式合成，且“文字描述”将与上述文案一致</div>
            <group  v-if="curType == 'compose'">
                <cell v-for="(item,index) in composeList"
                     :key="index"  class="compose-list">
                     <div class="mask" slot="value" v-if="!item.check"></div>
                    <div slot="icon" class="cover-bg-img" :style="{backgroundImage:'url(' + item.src + ')'}" @click="showImg(index)"></div>
                    <div slot="after-title" v-if="index == 0">
                        <div class="mgb8 fs20 black">首图</div>
                        <div class="fs12 light-gray">首图 + 文字描述</div>
                    </div>
                    <div slot="after-title" v-else-if="index == 1">
                        <div class="mgb8 fs20 black">竖排四图</div>
                        <div class="fs12 light-gray">商品的前四张图(竖排) + 文字描述</div>
                    </div>
                    <div slot="after-title" v-else-if="index == 2">
                        <div class="mgb8 fs20 black">横排四图</div>
                        <div class="fs12 light-gray">商品的前四张图(横排) + 文字描述</div>
                    </div>
                    <div slot="value" :class="['iconNH icon-checkbox ',{' is-active':item.check}]" @click.prevent="select(item)"></div>
                </cell>
            </group>
            <ul v-else>
                <li :class="{'first-img':singleImg}"
                    v-for="(item,index) in tempList"
                     :key="index" class="img-list">
                    <div class="cover-bg-img" :style="{backgroundImage:'url(' + item.src + ')'}" @click="showImg(index)"></div>
                    <div class="select"  @click="select(item)" v-if="curType == 'allImg'">
                        <i :class="['iconNH icon-select',{' is-active':item.check}]" v-if="curType != 'firstImg'"></i>
                    </div>

                </li>
            </ul>
        </div>
        <div class="footer">
            <wechat-share-bar :imgList="shareImgList" :remark="info.remark" :imgBs64="imgAndRemark" :indexList="indexList" :isSingle="isSingle"></wechat-share-bar>
        </div>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {getH5UserPurchases} from '@/api/mine.js'
    import {transferBase64} from '@/api/activity';
    // 合成
    // import merge from '@/assets/js/merge.js';
    // import feather from '@/assets/js/feather.js';
    export default {
        name: "activity-transmit",
        directives: {
            TransferDom
        },
        data() {
            return {
                showPrice: false,
                purchPrice: 0,
                addPurchPrice: 0,
                //首图或合成图样式
                singleImg: false,
                tempList: [],
                info: {picPathsList: []},
                shareImgList:[],
                priceList: [],
                showImgList: [], // 保存预览的图片
                composeList: [], // 保存合成图片
                checkValue: '',
                curType: 'allImg',
                all: true,
                imgBs64: [],// 合成图
                imgAndRemark: [], //合成图和备注
                base64: '',
                imgbs64Share: [],
                indexList: [0],
                index: 0, // 记录行数
                picPathsList: [], // 判断图片数量
                bgSrc: require('../../assets/icon/bg.png'),
                isSingle: false
            }
        },
        watch: {
            showPrice(value) {
                if (value) {
                    if (this.info.remark.indexOf('\n现价') != -1) {
                        this.info.remark = this.info.remark.split('\n现价')[0] + '\n现价：¥' + this.showPrice()
                    } else {
                        this.info.remark += '\n现价：¥' + this.getTotalPrice()
                    }
                } else {
                    this.info.remark = this.info.remark.split('\n现价')[0]
                }
                // if (value) {
                //     this.info.remark = this.info.remark.split('\n现价')[0] + '\n现价：¥' + this.showPrice()
                // } else {
                //     this.info.remark = this.info.remark.split('\n现价')[0]
                // }
                this.imgAndRemark = [{imgList: this.imgBs64,remark:this.info.remark}]
            },
            purchPrice(value) {
                if (this.showPrice) {
                    this.info.remark = this.info.remark.split('\n现价')[0] + '\n现价：¥' + this.getTotalPrice()
                    this.imgAndRemark = [{imgList: this.imgBs64,remark:this.info.remark}]
                }
            },
            addPurchPrice(value) {
                if (this.showPrice) {
                    this.purchPrice = this.info.purchaseCost*1
                    this.purchPrice = this.purchPrice*1 + this.addPurchPrice*1
                    console.log(this.purchPrice)
                }
            }
        },
        computed: {
            isAll() {
                let flag = false
                this.tempList.map(item => {
                    if (!item.check) {
                        flag = true
                    }
                })
                this.all = flag ? false: true
                return this.all
            }
        },
        methods: {
            getH5UserPurchases () {
                let params = {
                    userId: this.$store.getters.userInfo.id
                }
                getH5UserPurchases (params).then(res => {
                    if (res.code === 0) {
                        this.priceList = res.data.userPurchaseResponses
                    }
                })
            },
            selectAll () {
                this.all = !this.all
                this.tempList.map(i => {
                    this.$set(i, 'check', this.all)
                })
                this.setShareImgList()
            },
            select (item) {
                this.$set(item, 'check', !item.check)
                this.setShareImgList()
            },

            compose() {
                this.singleImg = false
                this.curType = 'compose'
                if (this.picPathsList.length < 4) return this.$vux.toast.text('请选择至少有四张图片的商品合成')
                this.composeList = [{src: require('../../assets/icon/pic-sample-1-s-selected@2x.png'),check:true},{src: require('../../assets/icon/pic-sample-2-s-selected@2x.png'),check:false},{src: require('../../assets/icon/pic-sample-3-s-selected@2x.png'),check:false}]
                this.showImgList = [{src: require('../../assets/icon/pic-sample-1-s-selected@2x.png')},{src: require('../../assets/icon/pic-sample-2-s-selected@2x.png')},{src: require('../../assets/icon/pic-sample-3-s-selected@2x.png')}]
                this.setShareImgList()
            },
            allImg() {
                this.singleImg = false
                this.showImgList = this.info.picPathsList
                this.tempList = JSON.parse(JSON.stringify(this.info.picPathsList))
                this.tempList.map(i => {
                    this.$set(i, 'check', !i.check)
                })
                this.curType = 'allImg'
                console.log(this.tempList , 'allImg')
                this.setShareImgList()
            },
            showImg(index) {
                this.$store.commit('setPreviewerInfo', {
                    imgList: this.showImgList,
                    currentIndex: index,
                    time: new Date().getTime()
                })
                // this.$refs.previewer.show(index)
            },
            firstImg() {
                this.singleImg = true
                this.showImgList = this.tempList = [this.info.picPathsList[0]]
                this.curType = 'firstImg'
                this.setShareImgList()
            },
            getTotalPrice() {
                let salePrice = this.info.salePrice
                let purchPrice = this.purchPrice
                console.log(salePrice, purchPrice)
                return (parseFloat(salePrice) + (purchPrice ? parseFloat(purchPrice) : 0)).toFixed(2)
            },
            // 设置分享组件所需图片
            setShareImgList(){
                if (this.curType != 'compose') {
                    this.shareImgList=[]
                    this.imgBs64 = []
                    this.imgAndRemark = []
                    this.tempList.forEach(item => {
                        if (item.check && this.curType != 'firstImg') {
                            this.shareImgList.push(item.src)
                        } else if(this.curType == 'firstImg'){
                            this.shareImgList.push(item.src)
                        }
                    })
                    console.log(this.shareImgList,'img')
                } else {
                    this.indexList = []
                    this.imgAndRemark = []
                    this.shareImgList = []
                    this.composeList.forEach((item,key) => {
                        if (item.check){
                            this.indexList.push(key)
                        }
                    })
                    console.log(this.info.remark)
                    console.log(this.indexList,'111')
                    this.imgAndRemark = [{imgList: this.imgBs64,remark:this.info.remark}]
                }

            },
            // 转化为base64
            async transferBase64(list) {
                this.imgBs64 = []
                await transferBase64(list).then(res => {
                    if (res.code == 0) {
                        this.imgBs64 = res.data
                        // alert(this.imgBs64.length+'========base64请求')
                        this.imgAndRemark=[{imgList: this.imgBs64,remark:this.info.remark}]
                        this.isSingle = true
                    }
                })
            }
        },
        created() {
            this.info = this.$route.query.info
            console.log(this.info)
            this.info.remark = this.info.remark.indexOf('\n现价') > 0 ? this.info.remark.substr(0,this.info.remark.indexOf('\n现价')) : this.info.remark
            this.tempList = JSON.parse(JSON.stringify(this.info.picPathsList))
            console.log(this.tempList,'created')
            console.log(this.info.picPathsList,'created')
            this.showImgList = this.info.picPathsList
            this.tempList.map(i => {
                this.$set(i, 'check', !i.check)
            })
            this.setShareImgList()
            this.purchPrice = this.info.purchaseCost
            if (!this.info.remark) this.info.remark = ''
            this.getH5UserPurchases()
            this.picPathsList = JSON.parse(JSON.stringify(this.info.picPathsList))
            let imgsList = []
            this.picPathsList.forEach((i,index) => {
                if (index < 4) {
                    imgsList.push(i.src)
                }
            })
            this.transferBase64(imgsList)
        }
    }
</script>

<style lang="less">
    .activity-transmit {
        .weui-icon-circle:before, .weui-icon-success-circle:before {
            content: '';
            width: 16px;
            height: 16px;
            background: url("../../assets/icon/commom_checkbox@2x.png") no-repeat;
            background-size: contain;
            margin-bottom: 3px;
        }
        .weui-icon-success-circle:before {
            background: url("../../assets/icon/commom_checked@2x.png") no-repeat;
            background-size: contain;
        }
        .weui-cells:before,.weui-cells:after{
            border:none;
        }
    }
</style>

<style lang="less" scoped>
    .activity-transmit {
        background-color: #fff;
        min-height:100%;
        margin-bottom:60px;
        .header {
            position: relative;
            padding: 13px 0;
            .close {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
            }
            .title {
                text-align: center;
                font-size: 18px;
            }
        }
        .main-content {
            padding: 0 20px;
            .price-group {
                padding: 0 12px;
                margin-bottom: 14px;
                .bold{font-weight:600}
                .price-item {
                    line-height: 48px;
                    // font-size: 16px;
                    .weui-cell {
                        padding: 0;
                    }
                    &:nth-child(2) {
                        border-top: 1px solid #DADADA;
                    }
                }
            }
            .content {
                margin-bottom: 18px;
                font-size: 16px;
                height:120px;
            }
            .mgt2{
                margin-top:-2px;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                margin: 15px 0;
                padding: 0 9px;
                li.img-list {
                    width: 100px;
                    height: 103px;
                    margin-bottom: 8px;
                    margin-right: 8px;
                    display:flex;
                    justify-content:center;
                    .cover-bg-img{
                        width:100%;
                        height: 100%;
                    }
                    .icon-checkbox{
                        vertical-align:center;
                    }
                    .select{
                        width:50px;
                        height:50px;
                        margin-left:-50px;
                        vertical-align:center;
                        margin-top:53px;
                        display: flex;
                        justify-content:flex-end;
                        align-items:flex-end;
                    }
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    &.first-img {
                        width: 100%;
                        height: 325px;
                        margin-right: 0;
                    }
                }
            }
            .compose-list{
                .cover-bg-img{
                    width: 88px;
                    height: 88px;
                    margin-right:15px;
                    background-size:100% 100%;
                }
                .mask{
                    position: absolute;
                    left:0;
                    top:0;
                    width: 300px;
                    height:108px;
                    background-color: rgba(255, 255, 255, .5);
                }
            }

        }

        .action-group {
            font-size: 10px;
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            width: 100%;
            height: 60px;
            align-items: center;
            .action-btn {
                flex: 1;
                i {
                    display: inline-block;
                }
                &:last-child {
                    i {
                        color: #7a7889;
                    }
                }
            }
            .divider {
                flex: 0 0 2px;
                height: 22px;
            }
        }
        .select-item {
            font-size: 10px;
            text-align: center;
            min-width: 90px;
            padding: 0 8px;
            line-height: 30px;
            margin: 0 3px 8px;
            &.is-active {
                color: #fff !important;
                background-color: #797988;
            }
        }
    }
</style>
