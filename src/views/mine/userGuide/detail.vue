<template>
    <div class="question-detail">
        <div class="question-detail__title">
            <div class="question-detail__title-icon"></div>
            <div class="question-detail__title-ctn">{{info.title}}</div>
        </div>
        <div class="question-detail__content" v-html="info.answer"></div>
        <div class="question-detail__footer" @click="$router.push(`/mine/customerService`)"><i class="iconNH icon-service mgr10"></i>问题还没解决？点击咨询客服吧</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3542118729,1037682771&fm=27&gp=0.jpg">'
            }
        },
        computed:{
          info(){
              return this.$route.query.info
          }
        },
        created(){
        }
    }
</script>

<style lang="less">
    .question-detail__content{
        img{
            max-width: 100%;
        }
    }
</style>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .question-detail {
        background: #fff;
        padding-bottom: 48px;
        &__title {
            padding: 0 18px;
            display: flex;
            align-items: center;
            height: 91px;
            background: url("../../../assets/icon/question-bg@2x.png") no-repeat;
            background-size: 100% 100%;
            &-icon {
                width: 53px;
                height: 53px;
                background: url('../../../assets/icon/question-sign@2x.png') no-repeat;
                background-size: 100% 100%;
            }
            &-ctn {
                font-size: 14px;
                color: #fff;
            }
        }
        &__content{
            padding: 16px;
        }
        &__footer {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            background: #FAFAFA;
            font-size: 14px;
            color: @light-gray;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 48px;
        }
    }

</style>
