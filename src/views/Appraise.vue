<template>
  <group label-width="5em" label-align="left" label-margin-right="3em">
    <x-textarea :rows="2" placeholder="请输入简述" v-model="project.qstitle" title="简述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入问题描述" v-model="project.pbdesc" title="问题描述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入解决方案" v-model="project.solution" title="解决方案"></x-textarea>
    <x-input title="业务处理人" v-model="project.createby" text-align="left" :disabled="true"></x-input>
    <x-input title="附件"></x-input>
    <div style="margin:0 20px 10px 65px" v-if="project.fileList.length > 0">
      <checker
        default-item-class="demo4-item"
        selected-item-class="demo4-item-selected"
        disabled-item-class="demo4-item-disabled"
      >
        <checker-item v-for="(val,index) in project.fileList" :key="index" @on-item-click="onItemClick(val)" v-model="val.name">{{val.name}}</checker-item>
      </checker>
    </div>
    <div style="margin:5px 20px 10px 70px" v-else>
      <p>{{fujianVal}}</p>
    </div>
    <cell title="评价"></cell>
    <div class="rat_div">
      <rater class="ra_ra" v-model="mark" :margin="10"></rater>
      <span class="star_text">{{mark | getName}}</span>
    </div>
    <x-textarea :rows="2" placeholder="请输入评价内容" v-model="project.valuation" title="评价内容"></x-textarea>
    <box gap="40px 30px">
      <x-button text="提交" @click.native="subInfo" :gradients="['#1D62F0', '#19D5FD']" style="margin:10px 0 30px 0"></x-button>
    </box>
    <toast v-model="showmeg" type="text" :time="500" is-show-mask text="提交成功!" position="middle"></toast>
  </group>
</template>

<script>
  import api from '../api/api';
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        project: {
          id: '',
          qstitle: '',
          pbdesc: '',
          solution: '',
          createby: '',
          omvlist: '',
          valuation: '',
          createdate: '',
          fileList: []
        },
        mark: '5',
        showmeg: false,
        fujianVal: '暂无附件!'
      }
    },
    computed: {
      ...mapGetters({
        itcode: 'getddConfigCode'
      })
    },
    watch: {},
    created() {
      let _that = this;
      if (window.location.toString().indexOf('?') > 0) {
        let pomidurl = window.location.toString().substr(window.location.toString().indexOf('?') + 1);
        let pomid = pomidurl.substr(pomidurl.indexOf('=') + 1);
        api.getProjectInfo(pomid, function (res) {
          console.log(res);
          if (res.data.pomlist.length > 0) {
            _that.project = res.data.pomlist[0];
            if (res.data.pomlist[0].fileList.length > 0) {
              _that.project.fileList = res.data.pomlist[0].fileList;
            }
            if (res.data.pomlist[0].omvlist.length > 0) {
              _that.mark = Number(res.data.pomlist[0].omvlist[0].mark);
            }
          }
        });
      }
    },
    filters: {
      getName(val) {
        if (val === 1) {
          return `非常不满意`;
        } else if (val === 2) {
          return `不满意`;
        } else if (val === 3) {
          return `基本满意`;
        } else if (val === 4) {
          return `满意`;
        } else if (val === 5) {
          return `非常满意`;
        }
      }
    },
    methods: {
      /**
       * 提交
       */
      subInfo () {
        let _that = this;
        let params = {
          itcode: _that.itcode,
          pomid: _that.project.id,
          mark: _that.project.mark,
          valuation: _that.project.valuation,
          createby: _that.project.createby
        }
        api.commitProjectInfo(params, function (res) {
          console.log(res)
          if (res.data.msg === 'success') {
            _that.showmeg = true
          }
        })
      },
      /**
       * 打开附件
       */
      onItemClick (val) {
        window.location.href = 'worktile/api/opermaint/download?fileid=' + val.fileid;
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .star_text {
    width: 5rem;
    margin: 0 10px;
    display: inline-flex;
  }
  .rat_div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
  .ra_ra {
    width: 50vw;
    margin-left: 10vw;
  }
  .demo4-item {
    background-color: pink;
    color: deepskyblue;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 15px;
    margin: 5px 10px 5px 0;
  }
  .weui-textarea {
   color: rgb(175, 176, 179)!important;
  }
  .demo4-item-selected {
    /*background-color: pink;*/
    /*color: #fff;*/
  }
  .demo4-item-disabled {
    /*background-color: pink;*/
    /*color: deepskyblue;*/
  }
</style>
