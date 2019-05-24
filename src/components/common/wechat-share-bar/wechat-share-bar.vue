<template>
    <div class="wechat-share-bar">
        <div class="action-group blue-white-bg dark-gray">
            <div class="action-btn" @click="drawAndShareImage('Friend')">
                <i class="icon-wx"></i>
                <div>转发给好友</div>
            </div>
            <span class="divider gray-bg"></span>
            <div class="action-btn" @click="drawAndShareImage('Circle')">
                <i class="icon-wx-friend"></i>
                <div>转发到朋友圈</div>
            </div>
            <span class="divider gray-bg"></span>
            <div class="action-btn" @click="drawAndShareImage('save')">
                <i class="icon-download"></i>
                <div>一键存图</div>
            </div>
        </div>
        <div v-transfer-dom>
            <confirm v-model="isShowSaving"
                     dialog-transition=""
                     title="提示"
                     @on-confirm="savePic">
                <p style="text-align:center;">您确定要保存图片吗？</p>
            </confirm>
        </div>
        <div v-transfer-dom>
            <confirm v-model="isShowSaving1"
                     dialog-transition=""
                     title="提示"
                     @on-confirm="savePic2">
                <p style="text-align:center;">您确定要保存图片吗？</p>
            </confirm>
        </div>
        <loading :show="show1" :text="text"></loading>
        <!-- <toast v-model="show1">{{text}}}</toast> 123-->
        <!--&lt;!&ndash; <img src="" alt="" id="avatar">-->
        <!--<img src="" alt="" id="avatar1">-->
        <!--<img v-for="(item,index) in src" :key="index" :src="item" alt="" id="avatar2">-->
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {setTimeout} from 'timers';

    export default {
        name: "wechat-share-bar",
        directives: {
            TransferDom
        },
        props: ['imgList', 'remark', 'imgBs64', 'indexList', 'isFinish', 'isSingle'],
        data() {
            return {
                isSavingPic: false,
                isShowSaving: false,
                isShowSaving1: false,
                show1: false,
                isShare: false,
                imgBs64Length: 0,
                curType: '',
                text: '正在合成,请耐心等待',
                imgbs64Share: [],
                bgSrc: require('../../../assets/icon/bg.png'),
                index: 0,
                src: []
            }
        },
        methods: {
            //一键存图
            savePic() {
                if (this.imgList.length === 0) {
                    this.$vux.toast.text('请选择有图片的商品')
                    return
                }
                if (!this.isSavingPic) {
                    this.isSavingPic = true
                    this.$vux.loading.show({
                        text: '存图中',
                        type: 'text'
                    })
                    var _this = this;

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
                                image: this.imgList
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
                            type: 'cancel'
                        })
                    });
                }
            },
            savePic2() {
                // if (this.imgbs64Share.length === 0) {
                //     this.$vux.toast.text('请选择有图片的商品')
                //     return
                // }
                if (!this.isSavingPic) {
                    this.isSavingPic = true
                    this.$vux.loading.show({
                        text: '存图中',
                        type: 'text'
                    })
                    var _this = this;

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
                                image: this.imgbs64Share
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
                            type: 'cancel'
                        })
                    });
                }


            },
            // 微信分享
            shareMedia(type, imgList) {
                // if (imgList.length === 0) {
                //     this.$vux.toast.text('请选择要转发的内容')
                //     return
                // }
                // window.alert(imgList,'imgList')
                console.log(imgList.length, 'imgList')
                // this.show1 = false
                Wechat.share({
                    message: {
                        title: "Hi, there",
                        description: this.remark,
                        thumb: "www/img/thumbnail.png",
                        mediaTagName: "TEST-TAG-001",
                        messageExt: type,
                        messageAction: "<action>dotalist</action>",
                        media: {
                            type: Wechat.Type.IMAGE,
                            image: imgList

                        }
                    },
                    scene: type === 'Circle' ? Wechat.Scene.TIMELINE : Wechat.Scene.SESSION  // share to Timeline
                }, function () {
                    console.log("Success");
                }, function (reason) {
                    console.log("Failed: " + reason);
                });
                if (this.remark.trim() !== '') {
                    this.$vux.toast.show({
                        text: '活动描述已复制到粘贴板',
                        type: 'text'
                    })
                }
                this.curType = ''
                this.text = '正在合成,请耐心等待'
            },
            canvasTextAutoLine(str, ctx, canvasWidth, initX, initY, lineHeight, lastY) {
                //remark[i],context,395,20,420+i*30+20*this.index,20, 420+i*30
                var count = 0;
                var lineWidth = 0;
                var lastSubStrIndex = 0;
                this.index = 0
                for (let i = 0; i < str.length; i++) {
                    lineWidth += ctx.measureText(str[i]).width;
                    if (lineWidth > canvasWidth - initX) {//减去initX,防止边界出现的问题
                        count++;
                        if (count >= 3) {
                            ctx.fillText(str.substring(lastSubStrIndex, i - 2) + '...', initX, initY);
                            initY += lineHeight;
                            lineWidth = 0;
                            lastSubStrIndex = i;
                            break;
                        }
                        ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
                        initY += lineHeight;
                        lineWidth = 0;
                        lastSubStrIndex = i;
                        console.log(count, '111')
                    }
                    if (i == str.length - 1) {
                        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
                    }
                }
                this.index = initY - lastY > 0 ? (initY - lastY) / lineHeight : 0
                console.log(this.index, '==========');
            },
            // 合成图
            // 合成首图
            drawFirstImage(imgList, remark1, cb) {
                let canvas = document.createElement("canvas");
                canvas.width = 800;
                canvas.height = 1000;
                let context = canvas.getContext("2d");
                let remark = remark1.split('\n')
                console.log(remark)
                //背景
                let myImage = new Image();
                myImage.src = this.bgSrc;//背景
                myImage.onload = () => {
                    context.drawImage(myImage, 0, 0, 800, 1000);
                    let myImage4 = new Image();
                    myImage4.src = imgList[0];
                    myImage4.onload = () => {
                        context.drawImage(myImage4, 0, 0, 800, 780);
                        context.beginPath();
                        context.fillStyle = '#fff';
                        context.fillRect(0, 800, 300, 300);
                        context.fill();
                        context.closePath();
                        context.font = "20px Arial";
                        context.fillStyle = "#000"
                        context.fillText(remark[0], 20, 810, 760)
                        this.index = 0
                        for (let i = 1; i < remark.length; i++) {
                            context.font = remark[i] && remark[i].indexOf('现价') >= 0 ? "bold 25px Arial" : "20px Arial";
                            context.fillStyle = remark[i] && remark[i].indexOf('现价') >= 0 ? "red" : "#000"
                            if (remark[i] && remark[i].indexOf('规格') >= 0) {
                                this.canvasTextAutoLine(remark[i], context, 760, 20, 810 + i * 30, 20, 810 + i * 30)
                            } else {
                                context.fillText(remark[i], 20, 810 + i * 30 + 20 * this.index, 760)
                            }
                        }
                        context.moveTo(0, 800)
                        context.lineTo(800, 1000)
                        context.strokeStyle = "#fff";
                        context.stroke()
                        let _base64 = canvas.toDataURL("image/png");
                        this.src.push(_base64)
                        cb(_base64)
                    }
                }
            },
            // 竖排
            drawVerticalImage(imgList, remark1, cd) {
                let canvas = document.createElement("canvas");
                canvas.width = 800;
                canvas.height = 1300;
                let context = canvas.getContext("2d");
                let remark = remark1.split('\n')
                //背景
                let myImage = new Image();
                myImage.src = this.bgSrc;//背景
                myImage.onload = () => {
                    context.drawImage(myImage, 0, 0, 800, 1300);
                    let myImage4 = new Image();
                    myImage4.src = imgList[0];
                    myImage4.onload = () => {
                        context.drawImage(myImage4, 0, 0, 800, 780);
                        context.beginPath();
                        context.fillStyle = '#fff';
                        let myImage3 = new Image();
                        myImage3.src = imgList[1];
                        myImage3.onload = () => {
                            context.drawImage(myImage3, 10, 810, 250, 300);
                            context.beginPath();
                            context.fillStyle = '#fff';

                            let myImage2 = new Image();
                            myImage2.src = imgList[2];
                            myImage2.onload = () => {
                                context.drawImage(myImage2, 260, 810, 250, 300);
                                context.beginPath();
                                context.fillStyle = '#fff';
                                let myImage1 = new Image();
                                myImage1.src = imgList[3];
                                myImage1.onload = () => {
                                    context.drawImage(myImage1, 520, 810, 250, 300);
                                    context.beginPath();
                                    context.fillStyle = '#fff';
                                    let _base64 = canvas.toDataURL("image/png");
                                    this.src.push(_base64)
                                    // this.imgbs64Share.push(_base64)
                                    cd(_base64)
                                }
                            }
                        }
                    }
                    context.font = "20px Arial";
                    context.fillStyle = "#000"
                    context.fillText(remark[0], 20, 1140, 760)
                    this.index = 0
                    for (let i = 1; i < remark.length; i++) {
                        context.font = remark[i] && remark[i].indexOf('现价') >= 0 ? "bold 25px Arial" : "20px Arial";
                        context.fillStyle = remark[i] && remark[i].indexOf('现价') >= 0 ? "red" : "#000"
                        if (remark[i] && remark[i].indexOf('规格') >= 0) {
                            this.canvasTextAutoLine(remark[i], context, 760, 20, 1140 + i * 30, 20, 1140 + i * 30)
                        } else {
                            context.fillText(remark[i], 20, 1140 + i * 30 + 20 * this.index, 760)
                        }
                    }
                    context.moveTo(0, 800)
                    context.lineTo(800, 1300)
                    context.strokeStyle = "#fff";
                    context.stroke()
                }
            },
            // 横排
            drawHorizontalImage(imgList, remark1, cd) {
                let canvas = document.createElement("canvas");
                canvas.width = 800;
                canvas.height = 600;
                let context = canvas.getContext("2d");
                let remark = remark1.split('\n')
                console.log(remark, 'remark')
                //背景
                let myImage = new Image();
                myImage.src = this.bgSrc;//背景
                myImage.onload = () => {
                    context.drawImage(myImage, 0, 0, 800, 600);
                    let myImage4 = new Image();
                    myImage4.src = imgList[0];
                    myImage4.onload = () => {
                        context.drawImage(myImage4, 0, 0, 400, 395);
                        context.beginPath();
                        context.fillStyle = '#fff';
                        let myImage3 = new Image();
                        myImage3.src = imgList[1];
                        myImage3.onload = () => {
                            context.drawImage(myImage3, 410, 0, 400, 395);
                            context.beginPath();
                            context.fillStyle = '#fff';

                            let myImage2 = new Image();
                            myImage2.src = imgList[2];
                            myImage2.onload = () => {
                                context.drawImage(myImage2, 410, 410, 195, 200);
                                context.beginPath();
                                context.fillStyle = '#fff';
                                let myImage1 = new Image();
                                myImage1.src = imgList[3];
                                myImage1.onload = () => {
                                    context.drawImage(myImage1, 610, 410, 195, 200);
                                    context.beginPath();
                                    context.fillStyle = '#fff';
                                    let _base64 = canvas.toDataURL("image/png");
                                    this.src.push(_base64)
                                    // this.imgbs64Share.push(_base64)
                                    cd(_base64)
                                    // return _base64
                                }
                            }
                        }
                    }
                    context.font = "20px Arial";
                    context.fillStyle = "#000"
                    // this.canvasTextAutoLine(remark[0],context,395,20,420+i*30,20, 420+i*30)
                    // context.fillText(remark[0], 20, 420, 395)
                    this.index = 0
                    for (let i = 0; i < remark.length; i++) {
                        context.font = remark[i] && remark[i].indexOf('现价') >= 0 ? "bold 25px Arial" : "20px Arial";
                        context.fillStyle = remark[i] && remark[i].indexOf('现价') >= 0 ? "red" : "#000"
                        if (remark[i] && remark[i].indexOf('规格') >= 0) {
                            this.canvasTextAutoLine(remark[i], context, 395, 20, 420 + i * 30 + 20 * this.index, 20, 420 + i * 30)
                        } else if (remark[i] && remark[i].indexOf('货号') >= 0) {
                            this.canvasTextAutoLine(remark[i], context, 395, 20, 420 + i * 30 + 20 * this.index, 20, 420 + i * 30)
                        } else {
                            context.fillText(remark[i], 20, 420 + i * 30 + 20 * this.index, 395)
                        }

                    }
                    context.moveTo(410, 310)
                    context.lineTo(410, 600)
                    context.strokeStyle = "#fff";
                    context.stroke()
                }
            },
            drawAndShareImage(type) {
                this.curType = type
                if (this.imgList.length == 0) {
                    if (this.$route.path == '/mine/myShare') return this.$vux.loading.show({text: 'Loading'})
                    this.imgbs64Share = []
                    this.isShare = true
                    this.show1 = true
                    console.log(this.isSingle, 'this.isSingle')
                    if (this.isFinish && this.isShare) {
                        this.isSynthesis()
                    }
                    if (this.isSingle && this.isShare) {
                        this.isSynthesis()
                    }
                } else {
                    if (type == 'save') {
                        this.isShowSaving = true
                    } else {
                        // console.log(this.imgbs64Share)
                        this.shareMedia(type, this.imgList)
                    }
                }

            },
            // 是否合成
            isSynthesis() {
                console.log('进来了。。。')
                // this.imgbs64Share = []
                console.log(this.indexList, 'this.indexList')
                if (this.indexList.includes(0)) {
                    let that = this
                    this.imgBs64.forEach(item => {
                        this.drawFirstImage(item.imgList, item.remark, function (type) {
                            that.imgbs64Share.push(type)
                        })
                    })
                }
                if (this.indexList.includes(1)) {
                    let that = this
                    this.imgBs64.forEach(item => {
                        this.drawVerticalImage(item.imgList, item.remark, function (type) {
                            that.imgbs64Share.push(type)
                        })
                    })
                }
                if (this.indexList.includes(2)) {
                    let that = this
                    this.imgBs64.forEach(item => {
                        this.drawHorizontalImage(item.imgList, item.remark, function (type) {
                            that.imgbs64Share.push(type)
                        })
                    })
                }
                console.log(this.imgbs64Share, 'this.imgbs64Share.length')
                console.log(this.imgBs64, 'this.imgBs64.length')
                if (this.isFinish && this.imgbs64Share.length == this.imgBs64.length && this.isShare) {
                    this.isCallBack(this.imgbs64Share)
                }
                if (this.isSingle && this.imgbs64Share.length == this.indexList.length && this.isShare) {
                    this.isCallBack(this.imgbs64Share)
                }
                if (this.isSingle) {
                    let that = this
                    setTimeout(function () {
                        that.show1 = false
                    }, 3000)
                }
            },
            isCallBack(val) {
                this.show1 = false
                if (this.curType == 'save') {
                    this.isShowSaving1 = true
                } else {
                    this.shareMedia(this.curType, val)
                }
            }
        },
        watch: {
            imgBs64: {
                handler(val) {
                    if (this.$route.path == '/activityTransmit' && val.length && this.curType) {
                        this.$vux.loading.hide()
                        this.drawAndShareImage(this.curType)
                    }
                    if (this.$route.path == '/batchTransmit' && this.curType) {
                        this.text = `共${this.$route.query.info.length}张合成图，正在合第${val.length}张`
                    }
                },
                deep: true
            },
            imgList: {
                handler(val) {
                    if (this.$route.path == '/mine/myShare' && val.length && this.curType) {
                        this.$vux.loading.hide()
                        this.drawAndShareImage(this.curType)
                    }
                },
                deep: true
            },
            imgbs64Share: {
                handler(val) {
                    if (this.isFinish && val.length == this.imgBs64.length && this.isShare) {
                        this.isCallBack(val)
                    }
                    if (this.isSingle && this.imgbs64Share.length == this.indexList.length && this.isShare) {
                        this.isCallBack(val)
                    }
                },
                deep: true
            },
            isFinish(val) {
                if (val) {
                    this.isSynthesis()
                }
            }

        },
        created() {
            console.log()
        }
    }
</script>

<style lang="less">
</style>

<style lang="less" scoped>
    .wechat-share-bar {
        .action-group {
            font-size: 10px;
            text-align: center;
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
    }
</style>
