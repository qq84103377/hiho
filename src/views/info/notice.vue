<template>
    <scroller
        ref="hot"
        noDataText="海量货品尽在嗨货"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <div class="info-logistics">
            <content-item v-for="(item,index) in list" :key="index" :info="item"></content-item>
        </div>
    </scroller>
</template>
<script>
    import contentItem from "./components/content-item";
    import {getMessages, setHasRead} from "@/api/message";

    export default {
        name: 'infoLogistics',
        components: {
            contentItem
        },
        data() {
            return {
                list: [],
                pageNum: 0,
                flag: false
            }
        },
        created() {
            // this.getList()
        },
        methods: {
            setRead(){
                setHasRead({userId:this.$store.getters.userInfo.id,messageType:'NOTICE'}).then(res => {
                    console.log(res.data,'设置已读');
                })
            },
            refresh(done){
                done(true)
                this.pageNum = 1
                this.getList(done)
            },
            async infinite(done){
                this.pageNum++
                await this.getList(done)
                if(!this.flag){
                    this.setRead()
                    this.flag = true
                }
            },
            async getList(done) {
                const params = {
                    userId: this.$store.getters.userInfo.id,
                    messageType: 'NOTICE',
                    pageNum: this.pageNum,
                    pageSize: 9
                }
                await getMessages(params).then(res => {
                    console.log(res.data,'NOTICE');
                    if(res.code==0){
                        if(res.data.imMessages.length==0){
                            if (this.pageNum === 1) this.list = []
                            done(true)
                            return
                        }
                        this.list = this.pageNum===1?res.data.imMessages:this.list.concat(res.data.imMessages)
                        done()
                    }
                })
            }
        }
    }
</script>
<style>

</style>

