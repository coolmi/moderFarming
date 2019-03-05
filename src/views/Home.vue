<template>
  <div>
    <div style="height:44px;">
      <button-tab class="top_but" v-model="selectedIndex">
        <button-tab-item :selected="selectedIndex === index" v-for="(item, index) in tabList"
                  @click.native="tabItemClick(index)" :key="index">{{item.name}}
        </button-tab-item>
      </button-tab>
    </div>
    <!--全部-->
    <div v-if="selectedIndex === 0 && AllList.length > 0">
        <swipeout>
          <swipeout-item :threshold=".5" transition-mode="follow" v-for="item in AllList" :key="item.id" class="bor_">
            <div slot="content" class="list-content" @click="eventView(item)">
              <img slot="icon" width="35" height="35" v-if="item.avatar" class="cellImg"
                   :src="item.avatar">
              <div slot="icon" class="cellDiv" v-else>
                {{item.name}}
              </div>
              <div class="content_div">
                <span>{{item.name + '提出来' + item.event + ',请办理!'}}</span>
                <span>{{item.time}}</span>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
    </div>
    <div v-if="selectedIndex === 0 && AllList.length < 0" class="emptyDiv">
      <img src="/static/image/zwsj.png">
    </div>
    <!--进行中-->
    <div v-if="selectedIndex === 1 && IngList.length > 0">
        <swipeout>
          <swipeout-item :threshold=".5" transition-mode="follow" v-for="item in IngList" :key="item.id" class="bor_">
            <div slot="right-menu">
              <swipeout-button @click.native="editClick(item)" background-color="#336DD6"></swipeout-button>
              <swipeout-button @click.native="deleteClick(item)" background-color="#D23934"></swipeout-button>
            </div>
            <div slot="content" class="list-content" @click="eventView(item)">
              <img slot="icon" width="35" height="35" v-if="item.avatar" class="cellImg"
                   :src="item.avatar">
              <div slot="icon" class="cellDiv" v-else>
                {{item.name}}
              </div>
              <div class="content_div">
                <span>{{item.name + '提出来' + item.event + ',办理中!'}}</span>
                <span>{{item.time}}</span>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
    </div>
    <div v-if="selectedIndex === 1 && IngList.length < 0" class="emptyDiv">
      <img src="/static/image/zwsj.png">
    </div>
    <!--已完成-->
    <div v-if="selectedIndex === 2 && FinishList.length > 0">
        <swipeout>
          <swipeout-item :threshold=".5" transition-mode="follow" v-for="item in FinishList" :key="item.id" class="bor_">
            <div slot="content" class="list-content" @click="eventView(item)">
              <img slot="icon" width="35" height="35" v-if="item.avatar" class="cellImg"
                   :src="item.avatar">
              <div slot="icon" class="cellDiv" v-else>
                {{item.name}}
              </div>
              <div class="content_div">
                <span>{{item.name + '提出来' + item.event + ',办理完成!'}}</span>
                <span>{{item.time}}</span>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
    </div>
    <div v-if="selectedIndex === 2 && FinishList.length < 0" class="emptyDiv">
      <img src="/static/image/zwsj.png">
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    data() {
      return {
        selectedIndex: 0,
        tabList: [
          { name: '全部' },
          { name: '进行中' },
          { name: '已完成' }
        ],
        AllList: [
          { id: '1', name: '张三1', event: 'OA系统登录不上', time: '2019-01-01', type: '0' },
          { id: '2', name: '李四1', event: '资金系统登录不上', time: '2019-01-21', type: '0' },
          { id: '3', name: '王五', event: '我的系统登录不上', time: '2019-02-9', type: '0' }
        ],
        IngList: [
          { id: '4', name: '张三2', event: 'OA系统登录不上', time: '2019-01-01', type: '1' },
          { id: '5', name: '李四2', event: '资金系统登录不上', time: '2019-01-21', type: '1' },
          { id: '6', name: '王五2', event: '我的系统登录不上', time: '2019-02-9', type: '1' }
        ],
        FinishList: [
          { id: '7', name: '张三3', event: 'OA系统登录不上', time: '2019-01-01', type: '2' },
          { id: '8', name: '李四3', event: '资金系统登录不上', time: '2019-01-21', type: '2' },
          { id: '9', name: '王五3', event: '我的系统登录不上', time: '2019-02-9', type: '2' }
        ]
      }
    },
    computed: {
    },
    watch: {},
    created() {
      api.getpomlist(function (res) {
      })
    },
    methods: {
      tabItemClick(index) {
        this.selectedIndex = index;
      },
      eventView(item) {
        alert('事件处理中...');
      },
      editClick(item) {
        this.$router.push('/Appraise')
      },
      deleteClick(item) {
        let dd = window.dd
        dd.device.notification.confirm({
          message: '确认删除?',
          title: '提示',
          buttonLabels: ['确认', '取消'],
          onSuccess: function(result) {
            console.log(JSON.stringify(result))
            if (result.buttonIndex === 0) {
              dd.device.notification.toast({
                text: '删除成功', // 提示信息
                duration: 1, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                onSuccess: function (result) {
                },
                onFail: function (err) {
                }
              })
            }
          },
          onFail: function(err) {}
        });
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .list-content {
    /*width: 100vw;*/
    height: 60px!important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 40px;
    /*border: 1px solid red;*/
  }
  .top_but {
    margin: 10px 5px 0 5px;
  }
  .content_div {
    font-size: 15px;
    width: 90vw;
    height: 60px;
    /*line-height: 60px;*/
    /*border: 1px solid green;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cellDiv {
    width: 35px;
    height: 30px;
    /*width: 10vw;*/
    line-height: 30px;
    margin-right: 10px;
    font-size: .8rem;
    text-align: center;
    border-radius: 50%;
    color: #FFFFFF;
    background-color: #986526;
  }
  .bor_ {
    border-bottom: 1px solid #E5E5E5!important;
    margin: 3px 0;
  }
  .cellImg {
    display: block;
    margin-right: 10px;
    border-radius: 50%;
  }

  .emptyDiv {
    width: 100%;
    height: 500px;
    line-height: 500px;
    overflow: hidden;
    position: relative;
    text-align: center;
    margin: auto
  }

  .emptyDiv img {
    position: static;
    top: -50%;
    left: -50%;
    vertical-align: middle
  }
</style>
