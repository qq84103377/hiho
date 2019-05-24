<template>
    <div class="mine-address-list custom-body">
        <div class="main-content">
            <scroller
                ref="hot"
                noDataText="海量货品尽在嗨货"
                :on-refresh="refresh"
                :on-infinite="infinite">
                <div>
                    <group class="mgb8">
                        <cell v-for="(item,index) in form" :key="index">
                            <div slot="title" class="black cell-title fs16">
                                <span>{{item.receiverName}}</span>&nbsp;&nbsp;<span>{{item.phone}}</span><span
                                class="fs10 default" v-show="item.isDefault == 1">默认地址</span>
                            </div>
                            <div slot="inline-desc">
                                <span class="fs10">{{item.address}}</span>
                            </div>
                            <div slot>
                                <x-button type="primary" mini class="fs10" v-show="item.isDefault == 0"
                                          @click.native="setDefault(item.userAddressId)">设为默认
                                </x-button>
                                <x-button mini
                                          @click.native="$router.push({path: '/mine/addressEdit',query:{type:'edit',id:item.userAddressId}})"
                                          class="fs10">编 辑
                                </x-button>
                            </div>
                        </cell>
                    </group>
                </div>
            </scroller>
        </div>
        <div class="footer">
            <x-button type="primary" class="full-btn" @click.native="$router.push('/mine/addressEdit?type=add')">+ 新增地址
            </x-button>
        </div>

    </div>
</template>

<script>
    import {addressList, setDefaultAddressH5} from '@/api/mine.js'

    export default {
        name: 'mineAddressList',
        data() {
            return {
                form: [],
                msg: false,
                text: '',
                pageNum: 0
            }
        },
        methods: {
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getAddressList(done)

            },
            async infinite(done) {
                this.pageNum++
                await this.getAddressList(done)
            },
            getAddressList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 100,
                    pageNum: this.pageNum
                }
                addressList(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.userAddress.length == 0) {
                            if (this.pageNum === 1) this.form = []
                            if (done) return done(true)
                        }
                        this.form = this.pageNum === 1 ? res.data.userAddress : this.form.concat(res.data.userAddress)
                        if (done) return done()
                        console.log('我的地址' + this.pageNum + '页')
                        console.log(this.form.length, res.data.totalCount)
                    }
                })
            },
            setDefault(id) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    userAddressId: id
                }
                setDefaultAddressH5(params).then(res => {
                    this.$vux.toast.text(res.msg)
                    this.pageNum = 1
                    this.getAddressList()
                })
            }
        },
        activated() {
            this.pageNum = 1
            this.getAddressList()
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../../assets/style/vars.less';

    .mine-address-list {
        background-color: @mine-color;
        .cell-title {
            font-weight: 500;
            .default {
                margin-left: 15px;
                background-color: @gold;
                padding: 3px 5px;
            }
        }
        .vux-cell-primary {
            padding-right: 33px;
        }
        .vux-label {
            margin-bottom: 5px;
        }
        // 重写按钮
        .weui-btn_mini {
            display: block;
            font-size: 10px !important;
            padding: 0;
            width: 68px;
        }
        .weui-btn + .weui-btn {
            margin-top: 6px !important;
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
