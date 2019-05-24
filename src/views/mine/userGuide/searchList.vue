<template>
    <section class="search-list">
        <div v-if="dropList.length" class="search-list__select-drop">
            <group class="drop-list">
                <cell v-for="(item,index) in dropList" :key="index" class="dark-gray" :title='item.title' is-link
                      @click.native="goDetail(item)"></cell>
            </group>
        </div>
        <div class="search-list__header">
            <i @click="$router.go(-1)" class="icon-back iconNH"></i>
            <div class="search-list__header-search">
                <icon class="icon-search" type="search"></icon>
                <input @input="associationSelect" v-model.trim="keyword" type="text" placeholder="请输入关键词">

            </div>
            <div class="search-list__header-confirm" @click="search">搜索</div>

        </div>
        <div v-if="!isSearch" class="search-list__content">
            <div class="fs12 light-gray mgb8">最近搜索</div>
            <div class="search-list__content-history">
                <div @click="keyword=item;search()" class="history-item" v-for="(item,index) in historyList" :key="index">{{item}}</div>
            </div>
        </div>
        <div>
            <group class="drop-list">
                <cell v-for="(item,index) in searchList" :key="index" class="dark-gray" :title="item.title" is-link
                      @click.native="$router.push({path:`/mine/questionDetail`,query:{info:item}})"></cell>
            </group>
        </div>
        <!--搜索不到结果-->
        <div v-if="isSearch&&!searchList.length&&!isLoading" class="search-none">抱歉,查询不到该问题</div>
        <div class="search-list__footer" @click="$router.push(`/mine/customerService`)"><i class="iconNH icon-service mgr10"></i>问题还没解决？点击咨询客服吧</div>

    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import { searchGuides, getSearchHistory, addSearchHistory } from '@/api/mine'
    export default {
        data() {
            return {
                isSearch: false,
                keyword: '',
                searchList: [],
                dropList: [],
                historyList: []
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.vuxLoading.isLoading
            })
        },
        created(){
            this.getHistoryList()
        },
        methods: {
            goDetail(item){
                addSearchHistory({userId:this.$store.state.user.userInfo.id,keyword:this.keyword}).then(res => {
                    console.log(res,'添加搜索记录');
                })
                this.$router.push({path:`/mine/questionDetail`,query:{info:item}})
            },
            search(){
                this.$store.commit('updateLoadingStatus', {isLoading: true})

                if(this.keyword!=''){
                    //关键字不为空才添加搜索记录
                    addSearchHistory({userId:this.$store.state.user.userInfo.id,keyword:this.keyword}).then(res => {
                        console.log(res,'添加搜索记录');
                    })
                }

                searchGuides({keyword:this.keyword}).then(res => {
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    if(res.code==0){
                        this.searchList = res.data
                    }
                })
                this.dropList = [];
                this.isSearch = true;
            },
            getHistoryList(){
                getSearchHistory({userId:this.$store.state.user.userInfo.id}).then(res => {
                    if(res.code==0){
                        this.historyList = res.data
                    }
                })
            },
            associationSelect() {
                if(this.keyword!=''){
                    searchGuides({keyword:this.keyword}).then(res => {
                        if(res.code==0){
                            this.dropList = res.data
                        }
                    })
                }else{
                    this.dropList = []
                }
            }
        },
        activated(){
            // 返回本页面时将搜索联想下拉框去掉
            this.dropList = []
            this.getHistoryList()
        }
    }
</script>
<style lang="less">
    .search-list {
        .drop-list {
            .weui-cells.vux-no-group-title {
                margin-top: 0 !important;
            }
        }
    }
</style>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .search-list {
        background: #fff;
        padding: 48px 0;
        &__select-drop {
            z-index: 11;
            position: fixed;
            top: 36px;
            left: 48%;
            transform: translateX(-50%);
            max-height: 200px;
            overflow-y: auto;
            width: 280px;
            background: #fff;
            border: 1px solid @border-color;
        }
        &__header {
            z-index: 10;
            background: #FDFDFD;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            box-shadow: 0 4px #eee;
            padding: 8px 15px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &-confirm {
                font-size: 16px;
                color: @black;
            }
            &-search {
                height: 100%;
                position: relative;
                flex: 0 0 280px;
                .icon-search {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                input {
                    height: 100%;
                    border-radius: 14px;
                    padding-left: 38px;
                    width: 100%;
                    background: #F4F4FA;
                }
            }
        }
        &__content {
            padding: 8px 15px;
            &-history {
                display: flex;
                flex-wrap: wrap;
                .history-item {
                    padding: 0 12px;
                    margin: 0 8px 8px 0;
                    min-width: 76px;
                    height: 32px;
                    border-radius: 17px;
                    background: #ededf3;
                    font-size: 12px;
                    color: @light-gray;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
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
        .search-none{
            font-size: 12px;
            color: #B8B8C5;
            text-align: center;
            padding-top: 350px;
            height: 100%;
            background: url("../../../assets/icon/list-placeholder@2x.png") no-repeat center center;
            background-size: 144px 142px;
        }
    }
</style>
