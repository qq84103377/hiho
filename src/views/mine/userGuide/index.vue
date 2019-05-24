<template>
    <section class="user-guide">
        <div class="user-guide__search">
            <icon class="icon-search" type="search"></icon> <input @focus="$router.push(`/mine/searchList`)" type="text" placeholder="有问题可以试试搜索看看哦">
        </div>
        <group v-for="(guide,guideIndex) in guideList" :key="guideIndex" class="mgt8 user-guide__content-item">
            <div class="user-guide__content-item__title"><i class="title-divide"></i><span>{{guide.name}}</span></div>
            <cell v-for="(item,index) in guide.guideOneResponses" :key="index" class="dark-gray" :title="item.title" is-link @click.native="$router.push({path:`/mine/questionDetail`,query:{info:item}})"></cell>
        </group>
    </section>
</template>

<script>
    import {getGuides} from '@/api/mine.js'
    export default {
        data(){
          return {
              guideList: []
          }
        },
        created(){
            this.getList()
        },
        methods:{
            getList(){
                getGuides().then(res => {
                    console.log(res);
                    this.guideList = res.data.guideUnitResponses
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/vars.less';
    .user-guide{
        &__search{
            position: relative;
            padding: 8px 16px;
            background: #fff;
            .icon-search{
                position: absolute;
                left: 31px;
                top: 50%;
                transform: translateY(-50%);
            }
            input{
                padding-left: 38px;
                background: #F4F4FA;
                height: 28px;
                width: 100%;
                border-radius: 14px;
            }
        }
        &__content-item{
            &__title{
                display: flex;
                align-items: center;
                padding-left: 16px;
                line-height: 46px;
                font-size: 18px;
                color: @black;
                .title-divide{
                    width: 5px;
                    height: 22px;
                    display: inline-block;
                    background: #444540;
                    border-radius: 2px;
                    margin-right: 8px;
                }
            }
        }
    }
</style>
