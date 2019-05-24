<template>
  <div class="share-list">
    <scroller
            ref="shareList"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
    <div class="box">
      <div class="header">
        <span class="fs14">已生成邀请码<span class="fs18 weight">&nbsp;{{inviteNum}}&nbsp;</span>个</span>
        <span class="fs14 mgl24">注册<span class="fs18 weight">&nbsp;{{registerNum}}&nbsp;</span>人</span>
      </div>
      <p class="gray fs12 lh36">被邀请用户使用邀请码注册后自动关联用户手机号</p>
        <div class="table">
          <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false" style="background-color:#FAFAFA;">
            <thead>
              <tr style="background-color: #F6F6F6;border:none;" class="fs12 dark-gray">
                <th>邀请码</th>
                <th>时间</th>
                <th>用户</th>
                <th>使用情况</th>
              </tr>
            </thead>
            <tbody>
              <tr class="fs12 dark-gray" v-for="(item,index) in tableDate" :key="index">
                <td>{{item.code}}</td>
                <td>{{item.createAt}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.status == 0 ? '未使用': '已使用'}}</td>
              </tr>
            </tbody>
          </x-table>
        </div>
    </div>
  </scroller>
  </div>
</template>
<script>
import { XTable } from 'vux'
import {getH5InviteCodes} from '@/api/mine.js'
export default {
  components: {
    XTable
  },
  name: 'shareList',
  data () {
    return {
      pageNum: 0,
      form: {},
      tableDate: [],
      inviteNum: 0,
      registerNum: 0
    }
  },
  methods: {
    async refresh(done) {
        done(true)
        this.pageNum = 1
      await this.getDate(done)

    },
    async infinite(done) {
      this.pageNum++
      await this.getDate(done)
    },
    async getDate (done) {
      let params = {
        userId: this.$store.getters.userInfo.id,
        pageSize: 100,
        pageNum: this.pageNum
      }
      await getH5InviteCodes(params).then(res =>{
        if (res.code === 0) {
          if (res.data.h5UserInviteCodeResponses.length == 0) {
            done(true)
            return
          }
          this.inviteNum = res.data.inviteNum
          this.registerNum = res.data.registerNum
          this.tableDate = this.pageNum === 1 ? res.data.h5UserInviteCodeResponses : this.tableDate.concat(res.data.h5UserInviteCodeResponses)
          done()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/vars.less';
.share-list{
  .weight{
    font-weight:600;
  }
  .mgl24{
    margin-left:24px;
  }
  .box {
    margin-top: 8px;
    padding:16px 0 16px 16px;
    background-color: @white-bg;
    .header{
      padding-bottom:16px;
      border-bottom: 1px solid @gray;
    }
    .lh36{
      line-height:36px;
    }
    .table{
      padding-right:16px;
    }
  }

}
</style>

<style lang="less">
.share-list{
  .vux-table:after,.vux-table td:before, .vux-table th:before,.vux-table.vux-table-no-content-bordered tr:last-child td:before{
    border:none !important;
  }
}
</style>

