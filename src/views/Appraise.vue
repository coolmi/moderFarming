<template>
  <div class="page_">
    <x-textarea :rows="2" placeholder="请输入简述" v-model="project.qstitle" title="简述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入问题描述" v-model="project.pbdesc" title="问题描述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入解决方案" v-model="project.solution" title="解决方案"></x-textarea>
    <x-input title="业务处理人" v-model="project.createby"></x-input>
    <cell title="评价">
      <rater v-model="project.mark" :margin="10"></rater>
      <span class="star_text">{{project.mark | getName}}</span>
    </cell>
    <x-textarea :rows="2" placeholder="请输入评价内容" v-model="project.valuation" title="评价内容"></x-textarea>
    <x-input title="评价人" v-model="project.createby"></x-input>
    <x-input title="附件"></x-input>
    <div style="margin:5px 20px 10px 90px" v-if="Plist.length > 0">
        <checker
          v-model="person"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected"
          disabled-item-class="demo4-item-disabled"
        >
          <checker-item v-for="(val,index) in Plist" :key="index" @on-item-click="onItemClick(val.value)">{{val.key}}</checker-item>
        </checker>
    </div>
    <div style="margin:5px 20px 10px 90px" v-else>
      <checker
        v-model="fujianVal"
        default-item-class="demo4-item"
        selected-item-class="demo4-item-selected"
        disabled-item-class="demo4-item-disabled"
      >
        <checker-item value="fujianVal">{{fujianVal}}</checker-item>
      </checker>
    </div>
    <box gap="40px 30px">
      <x-button text="提交" @click.native="subInfo" :gradients="['#1D62F0', '#19D5FD']" style="margin:10px 0 30px 0"></x-button>
    </box>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        project: {
          qstitle: '',
          pbdesc: '',
          solution: '',
          createby: '',
          omvlist: '',
          mark: '5',
          valuation: '',
          createdate: ''
        },
        fujianVal: '暂无附件!',
        Plist: [
          { key: '苹果', value: '苹果' },
          { key: '香蕉', value: '香蕉' },
          { key: '橘子', value: '橘子' }
        ],
        ll: []
      }
    },
    computed: {
    },
    watch: {},
    created() {
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
      subInfo () {
        alert('提交成功!')
      },
      onItemClick (val) {
        alert(JSON.stringify(val))
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
  .demo4-item {
    background-color: pink;
    color: deepskyblue;
    font-size: 14px;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    border-radius: 15px;
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
