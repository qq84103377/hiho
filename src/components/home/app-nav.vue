<template>
    <nav class="toolbar-footer" v-if="!$route.meta.isHideTabbar">
        <div class="nav-item" v-for="(navItem, index) in tabOptions" :key="index" @click="setIndex(index, navItem)"
             :class="{'active': $route.meta.belone === navItem.tabPath}">
            <div style="position: relative;">
                <img :class="['icon' + index, 'icon']"
                     :src="$route.meta.belone === navItem.tabPath ? navItem.selectIcon : navItem.icon">
                <badge v-if="index==3&&cartNum>0" class="cart-badge" :text="cartNum"></badge>
            </div>
            <p>{{navItem.text}}</p>
        </div>
    </nav>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                badgeNum: '',
                tabIndex: 0,
                beloneTo: 'mission',
                tabOptions: [
                    {
                        text: '首页',
                        path: '/activity/live',
                        tabPath: 'activity',
                        icon: require('../../assets/icon/tab_home@2x.png'),
                        selectIcon: require('../../assets/icon/tab_home-selected@2x.png'),
                    },
                    {
                        text: '品牌',
                        path: '/brand',
                        tabPath: 'brand',
                        icon: require('../../assets/icon/tab_brand@2x.png'),
                        selectIcon: require('../../assets/icon/tab_brand-selected@2x.png'),
                    },
                    {
                        text: '关注',
                        path: '/follow',
                        tabPath: 'follow',
                        icon: require('../../assets/icon/tab_follow@2x.png'),
                        selectIcon: require('../../assets/icon/tab_follow-selected@2x.png'),
                    },
                    {
                        text: '进货车',
                        path: '/cart',
                        tabPath: 'cart',
                        icon: require('../../assets/icon/tab_cart@2x.png'),
                        selectIcon: require('../../assets/icon/tab_cart-selected@2x.png'),
                    },
                    {
                        text: '我的',
                        path: '/mine',
                        tabPath: 'mine',
                        icon: require('../../assets/icon/tab_mine@2x.png'),
                        selectIcon: require('../../assets/icon/tab_mine-selected@2x.png'),
                    }
                ]
            }
        },
        watch: {
            '$route'(to, from, next) {
                this.beloneTo = to.meta.belone
            }
        },
        computed: {
            ...mapState({
                cartNum: state => state.cart.cartNum
            }),
            getPermission(val) {
                return this.$store.state.userInfo.permissionList
            }
        },
        methods: {
            setIndex(index, navItem) {
                this.tabIndex = index;
                this.$router.push(navItem.path)
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/style/vars.less';

    nav {
        position: relative;
        .align-center;
        height: 50px;
        z-index: 9;
        text-align: center;
        color: @gray;
        background-color: @black;

        .nav-item {
            color: #636363;
            flex: 1;
            font-size: 10px;
            div {
                display: inline-block;
                width: 22px;
                height: 22px;
            }
            .icon {
                width: 22px;
                height: 22px;
                vertical-align: bottom;
            }
            &.active {
                color: @gold;
            }

        }
        .cart-badge {
            position: absolute;
            right: -8px;
            top: -3px;
        }
    }

    .toolbar-footer {
        margin-bottom: constant(safe-area-inset-bottom);
    }
</style>
