<template>
    <div class="custom-body activity-detail">
        <!--<x-img class="bg-img" src="../../assets/img/dd.jpg" alt=""></x-img>-->
        <!--活动信息-->
        <div class="main-content">
            <scroller
                ref="activityDetail">
            <activity-item type="ACTIVITY" :activityInfo="activityInfo" class="activity-info">
                <div slot="badge">
                    <div class="badge1 gradient-gold brown">{{activityInfo.name}}</div>
                    <div :class="['badge2',{'preview':$route.query.type==1}]">{{$route.query.type==1?'活动预告':'热卖中'}}
                    </div>
                </div>
                <div slot="countdown">
                    <count-time :type="$route.query.type==1?1:0"
                                :time="$route.query.type==1?activityInfo.startTime:activityInfo.endTime"></count-time>
                </div>
            </activity-item>
            <div class="line-icon">
                <i class="iconNH icon-line"></i>
            </div>
            <!--货品列表-->
            <div class="goods-info">
                <activity-item type="GOODS" v-for="(item,index) in goodsList" :key="index" :activityInfo="item">
                    <div class="price" slot="price">
                        <div class="sale-price red">¥{{item.salePrice}}
                            <s class="blue-gray fs12" v-if="item.postedPrice">¥{{item.postedPrice}}</s>
                        </div>
                        <div class="black fs12">默认代购费:<span class="red fs18">¥{{item.purchaseCost}}</span></div>
                    </div>
                    <div v-if="$route.query.type==0" slot="shopcar">
                        <add-shopcar :checkList="item.specs" :goodsId="item.id"></add-shopcar>
                    </div>
                    <span slot="btn">
                      <x-button class="w82 has-radius" mini type="primary"
                                @click.native="$router.push({path:'activityTransmit',query:{type:1,info:item}})">
                    转发
                    </x-button>
                </span>
                </activity-item>
            </div>
            </scroller>
        </div>
        <div class="footer">
            <x-button @click.native="$router.push({path:'/transmitList',query:{id:activityInfo.id,type:'ACTIVITY'}})" type="primary" class="full-btn">批量转发</x-button>
        </div>
    </div>
</template>

<script>
    import {transferBase64,getH5ActivityDetail} from '@/api/activity';
    import {getPosition, getPositionEnter} from '@/components/position.js'

    export default {
        name: "activityDetail",
        data() {
            return {
                activityInfo: {endTime: ''},
                goodsList: [],
            }
        },
        created() {
            let params = {
                userId: this.$store.getters.userInfo.id,
                activityId: this.$route.query.activityId
            }
            getH5ActivityDetail(params).then(res => {
                console.log(res);
                this.activityInfo = res.data.activity
                this.goodsList = res.data.goods
            })
        },
        beforeRouteEnter(to,from,next){
            if(sessionStorage.activityDetailPosition){
                next(vm => {
                    getPositionEnter(sessionStorage.activityDetailPosition, vm, vm.$refs.activityDetail)
                })
            }
         next()
        },
        beforeRouteLeave (to, from, next) {
            // console.log(this.$refs.activityDetail, '1111')
            
            sessionStorage.activityDetailPosition = getPosition(this.$refs.activityDetail)
            console.log(sessionStorage.activityDetailPosition,'leave')
            next()
        }
    }
</script>

<style lang="less" scoped>
    .activity-detail {
        display: flex;
        flex-direction: column;
        .main-content {
            overflow: auto;
            flex: 1;
            padding: 12px 0;
            .activity-info {
                margin: 0 10px;
                border-radius: 4px;
            }
            /*padding: 126px 10px 0;*/
            .bg-img {
                width: 100%;
                height: 154px;
                position: fixed;
                top: 45px;
                left: 0;
                z-index: -1;
            }
            .line-icon {
                text-align: center;
                height: 30px;
                line-height: 30px;
            }
            .goods-info {
                :first-child {
                    margin-top: 0;
                }
            }
        }
    }
</style>
