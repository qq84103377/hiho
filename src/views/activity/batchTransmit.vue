<template>
    <div class="batch-transmit">
        <div class="content">
            <tab class="tab-bar" custom-bar-width="66px" :line-width="2" v-model="index">
                <tab-item v-for="(item, index) in activityText" :key="index" :selected="selectedText === item"
                          @click.native="selectTab(item)">{{item}}
                </tab-item>
            </tab>
            <div class="tab-content">
                <p class="fs12 dark-gray">{{imgDesc[index]}}</p>
                <img @click="showImg(index)" :src="imgDemo[index].src"/>
            </div>
        </div>
        <!-- <div @click="drawAndShareImage">一键合成</div> -->
        <div class="footer">
            <wechat-share-bar :imgList="[]"  :imgBs64="shareImgList" :indexList="indexList" remark = "" :isFinish="isFinish">>></wechat-share-bar>
        </div>
    </div>
</template>

<script>
    import {transferBase64} from '@/api/activity';
    export default {
        name: "batchTransmit",
        data() {
            return {
                index: 0,
                selectedText: '首图',
                activityText: ['首图','竖排四图','横排四图'],
                imgDemo:[{src: require('../../assets/icon/pic-sample-1@3x.png')},{src:require('../../assets/icon/pic-sample-2@3x.png')}, {src: require('../../assets/icon/pic-sample-3@3x.png')}],
                imgDesc:['首图+文字描述','商品的前四张图(竖排)+文字描述','商品的前四张图(横排)+文字描述'],
                sharePic:{},
                shareImgList:[],
                info: [],
                indexList: [0],
                isFinish: false
            }
        },
        methods:{
            // 转化为base64
            transferBase64(list) {
                // list.forEach((item,index) => {
                //     transferBase64(item.imgList).then(res => {
                //         if (res.code == 0) {
                //             this.shareImgList.push({imgList:res.data, remark:item.remark})
                //             console.log(list.length, this.shareImgList.length)
                //             if (this.shareImgList.length == list.length) {this.isFinish = true}
                //         }
                //     })
                // })
                list.forEach((item,index) => {
                    transferBase64(item.imgList).then(res => {
                        if (res.code == 0) {
                            this.shareImgList.push({imgList:res.data, remark:item.remark})
                            console.log(list.length, this.shareImgList.length)
                            // alert(list.length+'======'+this.shareImgList.length)
                            if (this.shareImgList.length == list.length) {this.isFinish = true}
                        }
                    })
                })
            },
            selectTab(item){
                switch (item){
                    case '首图':
                        this.indexList = [0]
                    break;
                    case '竖排四图':
                        this.indexList = [1]
                    break;
                    case '横排四图':
                        this.indexList = [2]
                    break;
                }
                console.log(this.indexList)
            },
            showImg(index) {
                let tempList=[]
                this.imgDemo.forEach(item=>{
                    tempList.push(item)
                })
                console.log(this.imgDemo)
                this.$store.commit('setPreviewerInfo', {
                    imgList: tempList,
                    currentIndex: index,
                    time: new Date().getTime()
                })
            }
        },
        created(){
            this.info=this.$route.query.info
            this.transferBase64(this.info)
            // this.transferBase64(this.info).then(function(data) {
            //     console.log(data)
            // })
            // this.shareImgList=this.sharePic.remarkPic
        }
    }
</script>

<style lang="less" scoped>
    .batch-transmit{
        display: flex;
        flex-direction: column;
        .content{
            flex: 1;
            overflow: auto;
            padding: 0 16px;
            background-color: #fff;
            .tab-content{
                padding: 10px 14px;
                img{
                    position: relative;
                    display: block;
                    width: 100%;
                    height: auto;
                    margin: 30px auto;
                    box-shadow: 0px 0px 10px #EDEDF3;
                }
            }
        }
        .footer{
            height: 60px;
            background-color: #1aad19;
        }
    }
</style>
