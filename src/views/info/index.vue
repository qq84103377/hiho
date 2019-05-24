<template>
  <div class="info-index custom-body">
    <div class="navigation">
      <div class="icon-back back posA" @click.stop="$router.back()"></div>
      <div class="fs16 text">消息中心</div>
      <div class="posA right" @click="$router.push('/infoSet')">消息设置</div>
    </div>
    <tab class="tab-bar" :scroll-threshold="3" custom-bar-width="36px" :line-width="2" v-model="index">
      <tab-item v-for="(item, index) in infoText" :key="index" :selected="selectedText == item.name" @click.native="selectTab(item)">{{item.name}}<badge v-if="item.num>0&&index>0" :text="item.num" class="badge"></badge>
      </tab-item>
    </tab>
    <swiper @on-index-change="swiperChange" :min-moving-distance="150" v-model="index" :show-dots="false">
      <swiper-item v-for="(item, $index) in infoText" :key="$index">
          <component v-if="$index==index" :is="curComponent"></component>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import logistics from "./logistics";
import notice from "./notice";
import {getMsgIcons, setHasRead} from '@/api/message'
import activity from "./activity";
export default {
  name: 'infoIndex',
  components:{
    logistics,
    notice,
    activity
  },
    watch:{
      index(newV,oldV){
          // let type = ''
          // if(oldV==0){
          //     type = 'TRADE'
          // }else if(oldV==1){
          //     type = 'NOTICE'
          // }else {
          //     type = 'ACTIVITY'
          // }
          // this.setRead(type)
          this.infoText[newV].num = 0
      }
    },
  data (){
    return {
      selectedText: '交易物流',
      index:0,
      infoText: [{name:'交易物流', component: 'logistics', num:0}, {name:'通知', component: 'notice', num:0}, {name:'活动', component: 'activity', num:0}],
      curComponent: 'logistics'
    }
  },
    created(){
      this.getMsgNum()
    },
  methods: {
      // setRead(type){
      //     setHasRead({userId:this.$store.getters.userInfo.id,messageType:type}).then(res => {
      //         console.log(res.data);
      //     })
      // },
      getMsgNum(){
          getMsgIcons({userId:this.$store.getters.userInfo.id}).then(res => {
              console.log(res.data,'未读消息数量');
              this.infoText[1].num = res.data[1]
              this.infoText[2].num = res.data[2]
          })
      },
    selectTab(item) {
      this.selectedText = item.name
      this.curComponent = item.component
    },
    swiperChange(index) {
      this.selectTab(this.infoText[index])
    }
  }
}
</script>
<style lang="less">
    @import '../../assets/style/vars.less';
    .info-index {
      .vux-slider {
        height: 100%;
        overflow: auto;
        padding-top: 0 !important;
        .vux-swiper {
            height: 100% !important;
            overflow-y: auto !important;
        }
      }
      .vux-swiper-item > div {
        height: 100% !important;
      }
      .vux-tab-wrap {
        padding-top: 80px !important;
      }
      .vux-tab-container{
        top:44px;
      }
      .badge{
        margin-left: 3px;
        margin-top: -10px;
      }
    }

</style>

