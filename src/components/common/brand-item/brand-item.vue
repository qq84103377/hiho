<template>
    <div class="brand-item" @click.stop="go(fileList)">
        <div class="brand-msg">
            <img class="logo" :src="fileList.brandLogo" />
            <div class="detail">
                <p class="name">{{fileList.brandName}}</p>
                <p class="good light-gray fs12"><span class="mgr16">活动 {{fileList.actNum}}</span><span>商品 {{fileList.goodsNum}}</span>
                </p>
            </div>
            <div class="follow">
                <i  @click.stop="getNotice()"
                   :class="['iconNH','icon-focus',{'active':fileList.hasNotice===1}]"></i>
            </div>
        </div>
        <ul v-if="fileList.goodsSimples.length>>0" class="good-list">
            <li class="cover-bg-img"
                v-for="(item, index) in fileList.goodsSimples.length>3?fileList.goodsSimples.slice(0,3):fileList.goodsSimples"
                :key="index"
                :style="{backgroundImage:'url(' + item.src + ')'}">
                <div class="price-tag">
                    ¥{{item.salePrice}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {notice} from '@/api/activity'

    export default {
        directives: {
            TransferDom
        },
        name: "brand-item",
        props: ['fileList','brandItemIndex'],
        data() {
            return {}
        },
        methods: {
            go(row) {
                this.$router.push({path: '/brandDetail', query: {hasNotice: row.notice,brandId:row.brandId}})
            },
            showImg(index) {
                // this.$refs.previewer.show(index)
                this.$store.commit('setPreviewerInfo', {
                    imgList: this.fileList.goodsSimples,
                    currentIndex: index,
                    time: new Date().getTime()
                })
            },

            getNotice() {
                console.log(this.fileList)
                let patams = {
                    userId: this.$store.getters.userInfo.id,
                    action: this.fileList.hasNotice===1 ? 0 : 1,
                    type: 'BRAND',
                    attrId: this.fileList.brandId
                }
                notice(patams).then(res => {
                    if (res.code === 0) {
                        this.$emit('reverstNotice',this.brandItemIndex)
                        this.$vux.toast.show({
                            type: 'text',
                            text: this.fileList.hasNotice ===1 ? '关注成功' : '取消关注'
                        })
                    }

                })
            }
        }
    }
</script>
<style lang="less">
    .brand-item {
        .weui-btn_mini.detail-btn {
            width: 32px !important;
            height: 32px !important;
            padding-left: 12px !important;
        }
    }

</style>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .brand-item {
        background: #fff;
        margin-top: 8px;
        padding: 20px;
        .brand-msg {
            display: flex;
            align-items: center;
            justify-content: stretch;
            .logo {
                width: 46px;
                height: 46px;
            }
            .detail {
                flex: 1;
                margin-left: 10px;
            }
        }
        .good-list {
            display: flex;
            margin-top: 14px;
            li {
                position: relative;
                width: 108px;
                height: 108px;
                margin-left: 5px;
                &:first-child {
                    margin-left: 0;
                }
                .price-tag {
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                    /*line-height: 22px;*/
                    font-size: 12px;
                    padding: 5px 8px;
                    border-radius: 11px;
                    background-color: rgba(255, 255, 255, 0.8);
                }
            }
        }

    }
</style>
