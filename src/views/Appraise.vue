<template>
  <div class="page_">
    <!--<selector class="sele" placeholder="请选择" title="产品*" :options="Plist" v-model="product"></selector>-->
    <!--<datetime class="dat" v-model="time" title="接收时间*"></datetime>-->
    <x-textarea :rows="2" placeholder="请输入简述" v-model="describes" title="简述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入问题描述" v-model="describes" title="问题描述"></x-textarea>
    <x-textarea :rows="2" placeholder="请输入解决方案" v-model="describes" title="解决方案"></x-textarea>
    <x-input title="业务处理人" v-model="person"></x-input>
    <cell class="cell_">
      <div class="span_">评价</div>
      <el-rate
        v-model="develop"
        show-text
        :texts="meg"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        class="el-rate_sss">
      </el-rate>
    </cell>
    <x-textarea :rows="2" placeholder="请输入评价内容" v-model="describes" title="评价内容"></x-textarea>
    <x-input title="附件"></x-input>
    <div style="margin:10px 10px 20px 50px">
        <checker
          v-model="person"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected"
          disabled-item-class="demo4-item-disabled"
        >
          <checker-item v-for="(val,index) in Plist" :key="index" @on-item-click="onItemClick(val.value)">{{val.key}}</checker-item>
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
        product: '',
        time: '',
        describes: '',
        person: '',
        develop: 5,
        meg: ['非常不满意', '不满意', '基本满意', '满意', '非常满意'],
        Plist: [
          { key: '苹果', value: '苹果' },
          { key: '香蕉', value: '香蕉' },
          { key: '橘子', value: '橘子' }
        ]
      }
    },
    computed: {
    },
    watch: {},
    created() {
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
  .page_ {
    margin-top: 10px;
    width: 100%;
  }
  .sele>.weui-cell__bd>.weui-select{
    float: right;
    width: 200px;
  }
  .dat>.weui-cell__ft>.vux-cell-value {
    float: right;
    display: inline-flex;
    width: 180px;
  }
  .red {
    color: red;
  }
  .span_ {
    float: left;
    font-size: 16px;
    color: #000;
    margin-right: 100px;
  }
  .el-rate__text {
    font-size: 18px;
    padding: 10px;
  }
  .el-rate_sss {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
  }
  .cell_>.weui-cell__ft{
    display: flex!important;
    align-items: center!important;
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
