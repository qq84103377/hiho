<template>
    <div class="address">
        <group>
            <cell v-for="(item,index) in addressList" :key="index" :border-intent="false">
                <div @click="setDefaultAddress(item)" slot="title">
                    <p class="pdb4"><span style="vertical-align: middle;">{{item.receiverName}}：{{item.phone}} </span><span class="default-address gradient-gold" v-if="item.isDefault">默认地址</span></p>
                    <p class="fs12 light-gray">{{item.address}}</p>
                </div>
                <div @click="setDefaultAddress(item)" :class="['icon-checkbox',{'is-active':item.isDefault}]"></div>
            </cell>
        </group>
        <x-button class="add-btn" type="primary" @click.native="$router.push('/mine/addressEdit?type=add')">+ 新增地址</x-button>
    </div>
</template>

<script>
    import {addressList, setDefaultAddressH5} from '@/api/mine'
    export default {
        name: "address",
        data(){
            return{
                check: false,
                addressList: []
            }
        },
        created(){
            this.getAddressList()
        },
        activated () {
            this.pageNum = 1
            this.getAddressList()
        },
        methods:{
            setDefaultAddress(item){
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    userAddressId:item.userAddressId
                }
                setDefaultAddressH5(params).then(res => {
                    for (let i = 0; i < this.addressList.length; i++) {
                        this.addressList[i].isDefault = 0
                    }
                    item.isDefault = 1
                    this.$store.commit('setAddressInfo', item)
                    this.$router.go(-1)
                })
            },
            getAddressList(){
                addressList({userId: this.$store.getters.userInfo.id}).then(res => {
                    console.log(res.data);
                    this.addressList = res.data.userAddress
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .address{
        .default-address{
            font-size: 9px;
            display: inline-block;
            line-height: 16px;
            padding: 0 5px;
            margin-left: 10px;
            vertical-align: middle;
        }
        .add-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
        }
    }
</style>
