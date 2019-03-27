<template>
  <div style="width: 100%;height: 100%;overflow: hidden">
    <!--<div v-show="showTips" class="tipsShow">请选择鸡场查看数据</div>-->
    <div v-show="showInfos" class="infoShow">
      <p>{{jsinfo}}暂无数据</p>
    </div>
    <div class="left-menu" v-show="showContent">
      <div class="table-item">
        <table border="0" class="table-left">
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.bartno}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.szrq}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.tfjb}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.szwd}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.jrwd}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.zlwd}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.mbsd}}</div>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <td align="center">
              <div>{{leftmenu.mbyl}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.pjwd}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.wbwd}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.nbsd}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.jy}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.mrsl}}</div>
            </td>
          </tr>
          <tr style="background-color: #fbffe7;">
            <td align="center">
              <div>{{leftmenu.mrsll}}</div>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <td align="center">
              <div>{{leftmenu.jrq}}</div>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <td align="center">
              <div>{{leftmenu.zl}}</div>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <td align="center">
              <div>{{leftmenu.pwq}}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="content-table">
        <table border="0">
          <tr style="background: #fbffe7">
            <!--字段与左侧字段不同,已同步-->
            <!--<td>鸡舍</td>-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span style="background-color: #fbffe7;">{{val.h_number}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--<td>生长日期</td>-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.szq}}</span>
            </td>
          </tr>
          <tr  style="background: #837BD1;">
            <!--通风级别-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.tfsp}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--设置温度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.target_wd}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--加热温度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.jrwd}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--制冷温度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.lqwd}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--目标湿度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.target_sd}}</span>
            </td>
          </tr>
          <tr style="background: #837BD1;">
            <!--目标压力-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.target_qy}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--平均温度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.snwd}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--外部温度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.swwd}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--内部湿度-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.snsd}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--静压-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.jy}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--每日水量-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.rys}}</span>
            </td>
          </tr>
          <tr style="background: #fbffe7">
            <!--每日饲料量-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.rwl}}</span>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <!--加热器-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.jrq}}</span>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <!--制冷-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.lq}}</span>
            </td>
          </tr>
          <tr style="background: #4E997A;">
            <!--喷雾器-->
            <td align="center" v-for="(val, index) in farmData" :key="index">
              <span>{{val.pt}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-show="showrl" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showrl" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;">鸡场</span>
              <span @click="hideCheck()"><icon type="clear"> </icon></span>
            </p>
          </div>
          <checker
            v-model="demo4"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in checklist" :key="index" v-model="item.label" @on-item-click="checkBarton">{{item.label}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
  // import { Cell, Group, Checker, CheckerItem, Popup, Box, Icon } from 'vux'
  import api from '../api/api'
  // import ding from '@/lib/ding'
  export default {
    name: 'frozen-title-columns',
    // components: {
    //   Cell, Group, CheckerItem, Checker, Popup, Box, Icon
    // },
    data () {
      return {
        demo4: '',
        jsinfo: '',
        testinfo: 'D019',
        showPopup: false,
        showrl: false,
        showContent: false,
        // showTips: true,
        showInfos: false,
        showxz: false,
        showChecker: false,
        checklist: [],
        leftmenu: {
          bartno: '赵堂鸡舍',
          szrq: '生长日期',
          tfjb: '通风级别',
          szwd: '设置温度',
          jrwd: '加热温度',
          zlwd: '制冷温度',
          mbsd: '目标湿度%',
          mbyl: '目标压力',
          pjwd: '平均温度',
          wbwd: '外部温度',
          nbsd: '内部湿度',
          jy: '静压',
          mrsl: '每日水量',
          mrsll: '每日饲料量',
          jrq: '加热器',
          zl: '制冷',
          pwq: '喷雾器'
        },
        farmData: []
      }
    },
    created () {
      let _that = this
      // _that.setTitle()
      // let werks = _that.$route.query.params[0] || null
      // let werksname = _that.$route.query.params[1] || null
      // _that.getBartnolist()
      let werks = '';
      let werksname = '';
      _that.checkBarton(werks, werksname)
    },
    methods: {
      setTitle () {
        let dd = window.dd;
        let _that = this;
        /* let config1 = {
          backgroundColor: '#000333',
          textColor: '#333000',
          items: [
            {
              'id': '1',
              'iconId': 'file',
              'text': '帮助',
              'url': 'https://img.alicdn.com/tfs/TB1Z04MSVXXXXbVXFXXXXXXXXXX-100-100.png'
              // 'url': '@/static/search.png'
            }
            // 可能会出现外网不能访问问题,注释记下来
          ]
        } */
        dd.biz.navigation.setMenu({
          backgroundColor: '#000333',
          textColor: '#333000',
          items: [
            {
              'id': '1',
              'iconId': 'file',
              'text': '帮助',
              'url': 'https://img.alicdn.com/tfs/TB1Z04MSVXXXXbVXFXXXXXXXXXX-100-100.png'
            }
            // 可能会出现外网不能访问问题,注释记下来
          ],
          onSuccess: function (data) {
            _that.showrl = !_that.showrl
            api.getMyFarm_url(data, function (res) {
              _that.checklist = res.data.data.farms
            })
          },
          onFail: function(err) {
            console.log(err)
          }
        })
      },
      checkBarton(value1, value2) {
        let _that = this
        let params = {
          werks: value1
        }
        if (!this.disabled) {
          this.showrl = false
        }
        api.getFarmData(params, function (res) {
          console.log(res);
          if (res.data.data.farmData) {
            _that.farmData = res.data.data.farmData
            _that.showInfos = false
            _that.showContent = true
          } else {
            _that.leftmenu.bartno = res.data.data.werks
            _that.jsinfo = _that.leftmenu.bartno
            // _that.showTips = false
            _that.showContent = false
            _that.showInfos = true
          }
          _that.leftmenu.bartno = res.data.data.werks
        })
      },
      hideCheck() {
        this.showrl = false
      },
      // 获取鸡舍列表
      getBartnolist (data) {
        api.getMyFarm_url(data, function (res) {
          // alert(JSON.stringify(res))
        })
      },
      // 通过鸡舍ID获取鸡舍详细内容
      getEcontrolInfo () {
        let _that = this
        api.getEcontrolInfo(_that.checklist.name, function (res) {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @tr-width: 100%;
  @td-width: @tr-width / 6;
  *{
    box-sizing: content-box;
    font-size: 14px;
    border: none;
  }
  .left-menu {
    width: @tr-width;
    height: @tr-width;
  }
  .table-item {
    width: @td-width * 2;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
  .table-item table{
    width: 100%;
    height: 100%;
  }
  .content-table {
    width: @td-width * 4;
    height: 100%;
    position: absolute;
    left: @td-width * 2 - 0.5px;
    top: 0;
    overflow-x:auto
    /*overflow-x:visible*/
  }
  .content-table::-webkit-scrollbar{
    /*滚动条整体样式*/
    width: 0;
    height: 0;
  }
  .content-table::-webkit-scrollbar-thumb{
    width: 0;
    height: 0;
  }
  .content-table table{
    width: @tr-width;
    height: @tr-width;
    overflow-x: auto;
    @fatder-width: @tr-width;
    @child-width: @tr-width / 4;
  }
  .content-table table tr{
    width: 100%;
  }
  .content-table table tr td {
    width: 25%;
  }
  .content-table table tr td span{
    /*width: 100px;*/
    @vw: 100vw;
    display: inline-block;
    width: @vw / 6 - 0.5px;
  }
  @check-width: 90vw;
  @check-width2: 10vw;
  .demo4-item {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    text-align: center;
    margin: @check-width2 / 6;
    padding: 5px 0;
    line-height: 18px;
    border-radius: 5px;
    width: @check-width / 3;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .demo4-item-selected {
    background-color: lightgreen;
    color: #fff;
  }
  .demo4-item-disabled {
    color: #999;
  }
  .checker-popup{
    min-height: 50%;
  }
  .weui-cells{
    background-color: #eeeeee!important;
  }
  .cherrrr{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .chedddd{
    flex: 1;
  }
  .demo1-item{
    background: lightgreen;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .demo1-item-selected{
    background-color: red;
  }
  .tipsShow{
    text-align: center;
    padding-top: 50vh;
  }
  .infoShow{
    text-align: center;
    padding-top: 50vh;
  }
</style>
