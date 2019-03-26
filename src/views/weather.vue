<template>
  <div class="bigbox">
    <div class="wheader">
      <div class="hbox">
        <div class="htitle">
          <div style=" width: 50%;height: 100%; display: flex;flex-direction: column; justify-content: center;align-items: center;margin-top: 20px;">
            <p style="font-size: 22px;color: #FFFFFF;">{{condition.temp}}℃</p>
            <p style="color: #FFFFFF;display: flex;align-items: center;">
            <span>
              <img :src=condition.iconurl alt="" style="width: 30px;">
            </span>
              <span style="margin-left: 5px;opacity: 0.6;font-size: 12px;">{{condition.condition}}&nbsp;&nbsp;|</span>
              <span style="opacity: 0.6;font-size: 12px;margin-left: 5px;margin-right: 5px;">空气{{condition.aqicn}}</span>
              <span style="opacity: 0.6;font-size: 10px">({{condition.aqi}})</span>
            </p>
          </div>
          <div style="width: 50%;height: 100%; display: flex;justify-content: center;align-items: center">
            <p style="color: #FFFFFF;opacity: 0.9; font-size: 8px; padding: 0 10px;">{{condition.alertContent}}</p>
          </div>
        </div>
        <div class="iconbox">
          <ul>
            <li>
              <p>{{condition.humidity}}%</p>
              <p>湿度</p>
            </li>
            <li>
              <p>{{condition.windSpeed}}</p>
              <p>风速</p>
            </li>
            <li>
              <p>{{condition.pressure}}hPa</p>
              <p>实时气压</p>
            </li>
            <li>
              <p>{{condition.windLevel}}级</p>
              <p>{{condition.windDir}}</p>
            </li>
            <li>
              <p>{{condition.uvi}}</p>
              <p>紫外线强度</p>
            </li>
            <li>
              <p>{{condition.realFeel}}°</p>
              <p>体感温度</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wcontent">
      <p style="border-bottom: 1px solid #e5e5e5!important;font-size: 12px;padding-left: 10px; height: 5vh;line-height: 5vh;">24小时天气预报</p>
      <div style="overflow: auto;">
        <ul class="wbox">
          <li v-for="(item, index) in condition24" :key="index">
              <p class="phour" style="font-size: 12px;">{{item.hour}}</p>
              <p class="wimg-box">
                <img :src=item.iconurl alt="">
              </p>
              <p class="pwindS" style="font-size: 10px"><span>{{item.windSpeed}}</span></p>
              <p class="ptemp" style="font-size: 16px; color: #11a7fc;">{{item.temp}}°</p>
              <p class="phum">
                <span style="font-size: 10px;background-color: #46AADC;color: #f1f1f1;padding:2px 5px;border-radius: 5px">湿度{{item.humidity}}</span></p>
              <p class="puvi" style="font-size: 10px; color: #333333;">{{item.uvi}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="wfooter">
      <p style="border-bottom: 1px solid #e5e5e5!important;font-size: 12px;padding-left: 10px; height: 5vh;line-height: 5vh;">一周天气预报</p>
      <div class="weatherbox">
        <ul>
          <li v-for="(val,index) in condition15" :key="index" style="display: flex;justify-content: space-between;align-items: center;">
            <p>{{val.predictDate}}</p>
            <p style="display: flex;justify-content: center;align-items: center">
              <img :src=val.iconurl alt="" style="width: 35px;">
            </p>
            <p>{{val.temp}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <!--<div id="weather24" :style="{width: '100vw', height: '300px'}"></div>-->
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  // let echarts = require('echarts/lib/echarts')
  // require('echarts/lib/chart/bar')
  // require('echarts/lib/chart/line')
  // require('echarts/lib/component/tooltip')
  // require('echarts/lib/component/title')
  export default {
    data () {
      return {
        // 实时天气
        condition: {
          aqicn: '',
          iconurl: ''
        },
        alertContent: '',
        // 24小时天气
        condition24: [
          {
            iconurl: ''
          }
        ],
        // 15日天气
        condition15: [
          {
            iconurl: ''
          }
        ],
        weather24: {
          title: {
            text: 'vue中使用echarts'
          },
          tooltip: {
            trigger: 'axis',
            padding: [5, 10]
          },
          xAxis: {
            data: []
          },
          yAxis: [
            {
              type: 'value',
              name: '温度',
              splitLine: { // 去除网格线
                show: false
              },
              scale: true
            },
            {
              type: 'value',
              name: '湿度',
              splitLine: {
                show: false
              },
              scale: true
            }
          ],
          series: [
            {
              name: '实时温度',
              type: 'line',
              // data: [5, 20, 36, 10, 40, 20, 5, 20, 36, 10, 40, 20, 5, 20, 36, 10, 40, 20, 5, 20, 36, 10, 40, 20]
              data: []
            },
            {
              name: '湿度',
              type: 'line',
              data: [],
              yAxisIndex: 1
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              throttle: '50',
              minValueSpan: 4,
              start: 0,
              end: 50
            }
          ]
        }
      }
    },
    created () {
      this.getWeatherInfo()
      this.getWeather24()
    },
    methods: {
      // drawLine () {
      //   let myWeather = echarts.init(document.getElementById('weather24'))
      //   myWeather.setOption(this.weather24)
      // },
      /**
       *
       */
      getWeather24 (data) {
        let _that = this
        api.getWeatherInfo(data, function (res) {
          let con24 = res.data.data.condition24
          for (let i in con24) {
            _that.weather24.xAxis.data.push(con24[i].hour)
            _that.weather24.series[0].data.push(con24[i].temp)
            _that.weather24.series[1].data.push(con24[i].humidity)
          }
        })
      },
      /**
       *
       */
      getWeatherInfo (data) {
        let _that = this
        api.getWeatherInfo(data, function (res) {
          console.log(res);
          if (res.data.code) {
            // 实时天气状况
            _that.condition = res.data.data.condition
            // 污染状况
            if (_that.condition.aqi > 0 && _that.condition.aqi < 51) {
              _that.condition.aqicn = '优'
            }
            if (_that.condition.aqi > 50 && _that.condition.aqi < 101) {
              _that.condition.aqicn = '良'
            }
            if (_that.condition.aqi > 100 && _that.condition.aqi < 151) {
              _that.condition.aqicn = '轻度污染'
            }
            if (_that.condition.aqi > 150 && _that.condition.aqi < 201) {
              _that.condition.aqicn = '中度污染'
            }
            if (_that.condition.aqi > 200 && _that.condition.aqi < 301) {
              _that.condition.aqicn = '重度污染'
            }
            if (_that.condition.aqi > 300) {
              _that.condition.aqicn = '严重污染'
            }
            // 天气icon转换成天气图标地址
            _that.condition.iconurl = require('../../static/iconWeather/W' + _that.condition.icon + '.png')
            // 24小时天气状况
            _that.condition24 = res.data.data.condition24
            for (let i in _that.condition24) {
              _that.condition24[i].iconurl = require('../../static/iconWeather/W' + _that.condition24[i].icon + '.png')
            }
            // 15小时天气状况  简化版本
            // console.log(res.data.data.condition15)
            _that.condition15 = res.data.data.condition15
            for (let i in _that.condition15) {
              _that.condition15[i].iconurl = require('../../static/iconWeather/W' + _that.condition15[i].icon + '.png')
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  @width: 100vw;
  @height: 100vh;
  html,body{
    width: @width;
    height: @height;
  }
  .bigbox{
    width: @width;
    height: @height;
    margin-top: -1vh;
  }
  .wheader{
    width: @width;
    height: @height / 100 * 35;
    background: url("../../static/weather.png");
    background-size: 100% 100%;
    background-position: center;
    border-bottom: 1px solid #e5e5e5!important;
    position: relative;
    .bgimg{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -99;
      filter: blur(10px);
    }
    .hbox{
      width: 100%;
      height: 100%;
      div{
        height: 50%;
        width: 100%;
      }
    }
  }
  .htitle{
    display: flex;

  }
  .iconbox ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .iconbox ul li {
    width: @width / 3;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p:first-child{
      color: #FFFFFF;
      font-size: 14px;
    }
    p:nth-child(2){
      color: #FFFFFF;
      opacity: 0.6;
      font-size: 10px;
    }
  }
  .wcontent{
    width: @width;
    height: @height / 100 * 35;
    background-color: #fff;
    overflow: hidden;
    div{
      overflow: auto;
    }
  }
  .wbox{
    display: flex;
    flex-wrap: nowrap;
    width: @width * 4;
    li{
      width: @width / 6;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .phour{
        height: @height / 100 * 5;
        width: @width / 6;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pwindS{
        /*border: 1px solid red!important;*/
        height: @height / 100 * 5;
        width: @width / 6;
        line-height: @height / 100 * 5;
        display: flex;justify-content: center;align-items: center;
      }
      .ptemp{
        /*border: 1px solid red!important;*/
        height: @height / 100 * 5;
        width: @width / 6;
        line-height: @height / 100 * 5;
        display: flex;justify-content: center;align-items: center;
      }
      .phum{
        height: @height / 100 * 5;
        width: @width / 6;
        display: flex;justify-content: center;align-items: center;
        /*border: 1px solid red!important;*/
      }
      .puvi{
        /*border: 1px solid red!important;*/
        height: @height / 100 * 5;
        width: @width / 6;
        line-height: @height / 100 * 5;
        display: flex;justify-content: center;align-items: center;
      }
    }
  }
  .wimg-box{
    height: @height / 100 * 5;
    width: @width / 6;
    /*border: 1px solid red!important;*/
    display: flex;justify-content: center;align-items: center;
  }
  .wimg-box img{
    width: 40px;
    height: 40px;
  }
  .wfooter{
    width: @width;
    height: @height / 100 * 30;
    font-size: 12px;
    /*border: 1px solid red!important;*/
  }
  .weatherbox {
    padding: 0 20px;
  }
  .weatherbox ul li{
    height: @height / 100 * 25 / 6;
  }
</style>
