<template>
  <div style="width: 100vw;height: 100vh;background-color: #f4f4f4; padding-top: 20px;">
    <div v-for="(item2, index3) in list2" :key="index3" class="listbox">
      <p>{{item2.name}}</p>
      <ul>
        <li v-for="(val2, _index4) in item2.list" :key="_index4" @click="showinfo(index3, _index4)">
          <span :class="val2.flag === '0' ? 'bgred' : ''">{{val2.ORG_NAME}}</span>
          <!--<span :class="val2.flag === '0' ? 'bgred' : ''">{{val2.flag}}</span>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import {Tab, TabItem, Swiper, SwiperItem, ButtonTab, ButtonTabItem} from 'vux'
  export default {
    components: {
      Tab, TabItem, Swiper, SwiperItem, ButtonTabItem, ButtonTab
    },
    data () {
      return {
        demo2: '美食',
        list2: [],
        index: 0,
        list3: [],
        list4: [],
        redFarm: ''
      }
    },
    created () {
      this.getAllUseFarm()
    },
    methods: {
      showinfo(index, index2) {
        let _that = this
        let werks = _that.list2[index].list[index2].ORG_ID
        let werksname = _that.list2[index].list[index2].ORG_NAME
        let params = [
          werks,
          werksname
        ]
        _that.$router.push({path: '/table', query: {params: params}})
      },
      getAllUseFarm () {
        let _that = this
        api.getWerksIn10(res => {
          console.log(res)
          if (res.data.code) {
            _that.list3 = res.data.data
            // console.log(_that.list3)
            _that.getALLFarmAndOrg()
          }
        })
      },
      getALLFarmAndOrg() {
        let _that = this
        api.getMyFarm_url(res => {
          if (res.data.code) {
            _that.list2 = res.data.data.farms
            console.log(_that.list2);
            for (let i in _that.list2) {
              for (let j in _that.list2[i].list) {
                // console.log(_that.list3.indexOf(_that.list2[i].list[j].ORG_ID))
                let leg = _that.list3.indexOf(_that.list2[i].list[j].ORG_ID)
                if (leg < 0) {
                  _that.list2[i].list[j].flag = '0'
                } else {
                  _that.list2[i].list[j].flag = ''
                }
              }
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @width: 100vw;
  @height: 100vh;
  *{
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  .listbox{
    width: @width;
    margin-bottom: 10px;
  }
  .listbox p {
    border-bottom: 1px solid #11a7fc!important;
    font-size: 20px;
    font-weight: bolder; color: #11a7fc;
    padding-left: -8px;
    margin: 0 14px 5px 14px;
  }
  .listbox ul {
    margin-left: 3vw;
    width: @width / 100 * 94;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .listbox ul li{
    width: @width / 100 * 94 / 3;
    color: #333;
    margin: 2px 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .listbox ul li span{
    display: inline-block;
    background-color: #FFFFFF;
    width: 96%;
    font-size: 14px;
    border-radius: 5px;
    padding: 7px 0;
  }
  .bgred{
    background-color: #ff7f50!important;
    color: #FFFFFF;
  }
</style>
