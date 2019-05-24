<template>
    <div class="info-set">
        <!--<group title="应用外通知（请在系统通知中进行更改）">-->
            <!--<cell title="新消息通知" value="已开启"></cell>-->
        <!--</group>-->
        <group title="应用内通知">
            <cell v-for="(item,index) in text" :key="index" :title="item.title" is-link>
                <div @click="popShow(item,index)">
                    {{item.value}}
                </div>
            </cell>
        </group>
        <!--<group title="应用内通知方式">-->
        <!--<x-switch title="应用内提醒" v-model="check"></x-switch>-->
        <!--<x-switch title="铃声" v-model="check"></x-switch>-->
        <!--<x-switch title="震动" v-model="check"></x-switch>-->
        <!--</group>-->
        <div v-transfer-dom>
            <popup style="background: #fff;" v-model="isShow">
                <div class="popup1">
                    <div class="pop-item sheet-header">{{header}}</div>
                    <div @click="select(item)" class="pop-item" v-for="(item,index) in actionMenus" :key="index">{{item.text}}<i v-if="item.check" :class="['icon-checkbox mgl8',{'is-active':item.check}]"></i></div>
                    <div class="pop-item light-gray" @click="isShow=false">取消</div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import {imMessageReceiveSetting, getMsgSettings} from '@/api/message'
    import {XSwitch, TransferDomDirective as TransferDom} from 'vux'

    export default {
        name: 'infoSet',
        directives: {
            TransferDom
        },
        components: {
            XSwitch
        },
        data() {
            return {
                header: '',
                actionMenus: [{text:'接收并提醒',check:false},{text:'接收但不提醒',check:false},{text:'屏蔽该栏目',check:false}],
                isShow: false,
                check: true,
                text: [{title:'交易物流',value:'接收并提醒'},{title:'系统通知',value:'接收并提醒'},{title:'活动通知',value:'接收并提醒'}]
            }
        },
        created(){
          this.getSetting()
            // console.log(this.$store.state.message.rongYunRes.content.data,'====');
            // console.log(JSON.parse(this.$store.state.message.rongYunRes.content.data),'=======');
            // console.log(eval(this.$store.state.message.rongYunRes.content.data),'=======');
        },
        methods:{
            popShow(item,index){
                this.header = item.title;
                this.actionMenus.forEach(v => {
                    v.check = false
                })
                if(this.text[index].value=='屏蔽该栏目'){
                    this.actionMenus[2].check = true
                }else if(this.text[index].value=='接收但不提醒'){
                    this.actionMenus[1].check = true
                }else if(this.text[index].value=='接收并提醒'){
                    this.actionMenus[0].check = true
                }
                this.isShow = true
            },
            select(item){
                if(item.check) return
                this.actionMenus.forEach(v => {
                    v.check = false
                })
                item.check = true
                this.text.find(v => v.title==this.header).value = item.text
                this.setSetting()
                this.isShow = false
            },
            msgType(item){
                if(item.value == '接收并提醒'){
                    return 2
                }else if (item.value == '接收但不提醒'){
                    return 1
                }else {
                    return 0
                }
            },
            setSetting(){
                const params = {
                    userId: this.$store.getters.userInfo.id,
                    trade: this.msgType(this.text[0]),
                    notice: this.msgType(this.text[1]),
                    activity: this.msgType(this.text[2])
                }
                imMessageReceiveSetting(params).then(res => {
                    if(res.code==0){
                    }
                })
            },
            handleSelectType(){

            },
            getSetting(){
                getMsgSettings({userId:this.$store.getters.userInfo.id}).then(res => {
                    console.log(res.data,'用户消息设置列表');
                    if(res.code==0){
                        res.data.forEach((v,index) => {
                            if(v==0){
                                this.text[index].value = '屏蔽该栏目'
                            }else if (v==1){
                                this.text[index].value = '接收但不提醒'
                            }else if (v==2){
                                this.text[index].value = '接收并提醒'
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .info-set {
        .weui-cells__title {
            font-size: 12px;
        }
        .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after, .weui-switch:checked:after {
            content: ''
        }
    }
</style>

<style lang="less" scope>

    .pop-item{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #DADADA;
        line-height: 48px;
        font-size: 16px;
        color: #29292A;
        &.sheet-header{
            line-height: 36px;
            font-size: 12px;
            color: #9898A1;
        }
        &:last-child{
            border-bottom: none;
        }
    }
</style>


