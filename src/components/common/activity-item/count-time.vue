<template>
    <div class="count-down">
        <clocker v-if="isEnd=='0'" :time="time" @on-finish="clockerEnd">
            <div class="black">剩
                <span><span class="time-box blue-white-bg red">%D</span>天</span>
                <span><span class="time-box blue-white-bg red">%H</span>:<span
                    class="time-box blue-white-bg red">%M</span>:<span
                    class="time-box blue-white-bg red">%S</span>
                </span>
                {{type==1?'开始':'结束'}}
            </div>
        </clocker>
        <!--<clocker v-if="showDay" :time="time">-->
        <!--<div class="black fl">剩-->
        <!--<span ><span class="time-box blue-white-bg red">%H</span>:<span-->
        <!--class="time-box blue-white-bg red">%M</span>:<span-->
        <!--class="time-box blue-white-bg red">%S</span>-->
        <!--</span>-->
        <!--&lt;!&ndash;<span ><span class="time-box blue-white-bg red">%D</span>天</span>&ndash;&gt;-->
        <!--{{type==1?'开始':'结束'}}-->
        <!--</div>-->
        <!--</clocker>-->
        <div class="time-date">
            <div v-if="isEnd=='1'">活动已结束</div>
            {{type==1?'开始':'结束'}}时间{{time?time.substr(5,11):''}}
            <!--{{time.getMonth()+1>9?time.getMonth()+1:'0'+-->
            <!--(time.getMonth()+1)}}/{{time.getDate()>9?time.getDate():'0'+time.getDate()}}-->
            <!--{{time.getHours()>9?time.getHours():'0'+time.getHours()}}:{{time.getMinutes()>9?time.getMinutes():'0'+time.getMinutes()}}-->
        </div>
        <!--<countdown v-model="countTime" v-show="false"></countdown>-->
    </div>
</template>

<script>
    export default {
        name: "count-time",
        props: {
            time: {
                type: ''
            },
            type: {
                type: ''
            },
            isEnd: {
                type: String,
                default: '0'   //1 已结束 0 未结束
            }
        },
        data() {
            return {
                // showDay:false,
                // countTime: Number(new Date()) / 1000,
                hour: '',
                min: '',
                sec: ''
            }
        },
        methods: {
            clockerEnd() {
                this.$emit('clockerEnd')
            }
        },
        created() {
            // console.log(this.time);
            // if(this.time){
            //     this.showDay =  ((new Date(this.time) - new Date())/86400000)>1?false:true
            // this.countTime = Number(new Date(this.time))
            // this.showHour = !this.showDay
            // }
            // console.log(this.showDay,'11111111');
        },
        watch: {
            // time(v) {
            // this.showDay =  ((new Date(v) - new Date())/86400000)>1?false:true
            // this.countTime = Number(new Date(this.time))
            // this.showHour = !this.showDay
            //     console.log(this.countTime,'2222222');
            // },
            // countTime(v){
            //     console.log(v);
            //     this.hour = new Date(v ).getHours() > 9 ? new Date(v ).getHours() : '0' + new Date(v ).getHours()
            //     this.min = new Date(v * 1000).getMinutes() > 9 ? new Date(v * 1000).getMinutes() : '0' + new Date(v * 1000).getMinutes()
            //     this.sec = new Date(v * 1000).getSeconds() > 9 ? new Date(v * 1000).getSeconds() : '0' + new Date(v * 1000).getSeconds()
            // }
        }
    }
</script>

<style lang="less" scoped>
    .count-down {
        font-size: 12px;
        .time-box {
            margin: 0 3px;
            display: inline-block;
            text-align: center;
            line-height: 24px;
            width: 24px;
        }
        .time-date {
            color: #9B9B9B;
            line-height: 24px;
        }
    }
</style>
