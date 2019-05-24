<template>
    <header :class="[$route.path == '/brandDetail/brandDetailLive' || $route.path == '/brandDetail/brandDetailGoods' ? '': 'border']" v-if="$route.meta.isShowHeader">
        <!--<div class="header-btn clearfix" v-if="isSearchShow">-->
        <div class="header-btn clearfix">
            <div class="header-left fl">
                <!--<span class="header-handle" v-if="$route.meta.isSearchHeader" @click.stop="handleShowSearchBar(true)">-->
                    <!--<i class="nf-icon icon-search"></i>-->
                <!--</span>-->
                <span v-if="!($route.path == '/activity'||$route.path == '/cart')" class="header-handle"  @click="$router.go(-1)">
                    <i :class="[$route.path == '/brandDetail/brandDetailLive' || $route.path == '/brandDetail/brandDetailGoods' ? 'icon-back-white': 'icon-back','iconNH']"></i>
                </span>
            </div>
            <div :class="['header-center', $route.path == '/brandDetail/brandDetailLive' || $route.path == '/brandDetail/brandDetailGoods'? 'black': '']">
                <span :class="[$route.path == '/brandDetail/brandDetailLive' || $route.path == '/brandDetail/brandDetailGoods'? 'white': '']">{{$route.meta.title}}</span>
                <!--<span v-if="!$route.meta.isMessageTitle" @click="handleTogglePopup">-->
                    <!--{{$route.meta.title}}-->
                    <!--<i class="icon-bottom-triangle" v-if="$route.meta.isTriangleShow"></i>-->
                <!--</span>-->
                <!-- 显示消息列表头 -->
                <!--<div class="message-title" v-if="$route.meta.isMessageTitle && messageHeader && messageHeader.styleNo">-->
                    <!--<p class="style-no">{{messageHeader.styleNo + ' - ' + messageHeader.custName}}</p>-->
                    <!--<p class="mission-no">工单号: {{messageHeader.orderNo}}</p>-->
                <!--</div>-->
            </div>
            <!--&lt;!&ndash; 发送消息页显示 &ndash;&gt;-->
            <!--<div class="header-right fr">-->
                <!--<span class="send-btn" v-show="$route.meta.isSendForm" @click="handleSendMsg">-->
                    <!--发送-->
                <!--</span>-->
            <!--</div>-->
            <div class="header-right fr" @click="$router.push('/info')" v-if="$route.meta.isShowInfo"><i class="iconNH icon-info"></i><badge v-if="hasMsg" class="badge"></badge></div>
        </div>
        <!-- 工单列表搜索 -->
        <!--<div class="search-header align-center" v-if="isSearchShow && !$route.meta.isMissionMsgSearch">-->
            <!--<div class="search-input align-center">-->
                <!--<i class="nf-icon icon-search-header"></i>-->
                <!--<input type="text" @keyup.enter="handleSubmit" @input="handleSubmit" v-model="keyword" placeholder="输入关键字搜索">-->
                <!--<i class="nf-icon icon-search-clear" v-show="keyword" @click.stop="initInput"></i>-->
            <!--</div>-->
            <!--<span class="cancel-btn" @click="handleCancelSearch(false)">取消</span>-->
        <!--</div>-->
        <!-- 工单消息搜索 -->
        <!--<div class="search-header align-center" v-if="isSearchShow && $route.meta.isMissionMsgSearch">-->
            <!--<div class="search-input align-center">-->
                <!--<i class="nf-icon icon-search-header" @click="handleMissionMsgSubmit"></i>-->
                <!--<form action="">-->
                    <!--<input type="text" @keyup.enter="handleMissionMsgSubmit" v-model="keyword" placeholder="搜索工单号/客户名/款号">-->
                <!--</form>-->
                <!--<i class="nf-icon icon-search-clear" v-show="keyword" @click.stop="initInput"></i>-->
            <!--</div>-->
            <!--<span class="cancel-btn" @click="handleCancelSearch(false)">取消</span>-->
        <!--</div>-->
        <!-- 报表选择列表 -->
        <!--<popup v-model="showPopup">-->
            <!--<p class="popup-title grey">切换报表</p>-->
            <!--<checker v-model="reportType" @on-change="handleSelectReportType" default-item-class="checker-item" selected-item-class="item-selected">-->
                <!--<checker-item v-for="(item,index) in reportFormList" :key="item.index" :value="item.value">{{ item.label }}</checker-item>-->
            <!--</checker>-->
            <!--<p class="popup-cancel" @click="showPopup = false">取消</p>-->
        <!--</popup>-->
    </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Popup, Checker, CheckerItem } from 'vux';
// import { selectFacForms } from '@/api';
export default {
    data() {
        return {
            keyword: '',
            showPopup: false,
            reportType: '/statement'
        }
    },
    computed: {
        ...mapState({
            isSearchShow: state => state.isSearchShow,
            messageHeader: state => state.Message.messageHeader,
            userInfo: state => state.userInfo,
            reportFormList: state => state.Report.reportFormList,
            hasMsg: state => state.message.hasMsg
        })
        // ...mapState(['isSearchShow', 'messageHeader'])
    },
    watch: {
        '$route'(val) {
            // this.handleShowSearchBar(false);
            this.reportType = val.path;
        },
        'showPopup'(val) {
            this.$store.commit('updateStatement', val);
        }
    },
    mounted() {
        this.reportType = this.$route.path;
    },
    components: {
        Popup,
        Checker,
        CheckerItem
    },
    methods: {
        ...mapMutations(['handleShowSearchBar', 'handleSearch', 'initSearchData', 'setSendFormStatus', 'setMissionSearchData']),
        initInput() {
            this.keyword = '';
            this.initSearchData();
        },
        handleSubmit() {
            this.handleSearch(this.keyword);
        },
        handleCancelSearch() {
            this.initInput();
            // this.handleShowSearchBar(false)
        },
        // 消息发送
        handleSendMsg() {
            this.setSendFormStatus(true)
        },
        // 工单消息搜索
        handleMissionMsgSubmit() {
            this.setMissionSearchData({
                bol: true,
                keyword: this.keyword
            });
            this.keyword = '';
            // this.$nextTick(() => [
            //     this.handleShowSearchBar(false)
            // ])
        },
        handleTogglePopup() {
            if (!this.$route.meta.isTriangleShow) return;
            this.showPopup = true;
        },
        handleSelectReportType(val) {
            if (!this.$route.meta.isTriangleShow || !this.reportFormList.length) return;
            const item = this.reportFormList.find(item => item.value === val);
            if (!item) return;
            this.$router.replace({ path: val, query: { formId: item.formId } });
            // this.fetchReportFormList();
            this.$nextTick(() => {
                this.showPopup = false;
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '../../assets/style/vars.less';

header.border{border-bottom: .5px solid @border-color;}
header {
    .black{background-color:@black !important;border-bottom: .5px solid @black !important;}
    .white{color:@white-bg }
    // height: 45px;
    line-height: 45px;
    text-align: center;
    color: @black;
    background: #fff;
    .header-btn {
        position: relative;
    }
    .header-left {
        position: absolute;
        left: 0;
        top: 0;
        .header-handle {
            display: inline-block;
            height: 100%;
            padding: 0 16px;
            font-size: 16px;
        }
    }
    .icon-back {
        width: 16px;
        height: 16px;
    }
    form {
        flex: 1;
    }
    .search-header {
        height: 44px;
        text-align: left;
        .search-input {
            flex: 1;
            position: relative;
            // width: 7.89rem;
            height: 0.853rem;
            border-radius: 4px;
            background-color: #ffffff;
            box-shadow: inset 0 0 2px 0 rgba(38, 47, 59, 0.12);
            .icon-search-header {
            }
            .icon-search-clear {

            }
            input {
                flex: 1;
                height: 0.853rem;
            }
        }
        .cancel-btn {
            display: inline-block;

            color: #ffffff;
        }
    }
    .header-center {
        .message-title {
            display: flex;
            height: 44px;
            flex-direction: column;
            justify-content: center;
        }
        p {
            line-height: 15px;
        }
        .style-no {
        }
        .mission-no {
        }
        .icon-bottom-triangle {
            margin-left: 5px;
            border-top-color: #fff;
        }
    }
    .header-right {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        .send-btn {
            display: inline-block;
            width: 60px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            border-radius: 2px;
            background-image: linear-gradient(125deg, #ff9c38, #f78848);
        }
        .badge{
            position: absolute;
            right: -7px;
            top: -3px;
        }
    }
    .action-sheet {
        line-height: initial;
        color: #2c2c2c;
    }
    .popup-title {
        line-height: 36px;
        background: #fff;
        .border-bottom;
    }
    .popup-cancel {
        color: #2c2c2c;
    }
    .checker-item {
        display: block;
        width: 100%;
        background: #fff;
        .border-bottom;
        color: #2c2c2c;
    }
    .item-selected {
        color: #ffa941;
    }
}
</style>
