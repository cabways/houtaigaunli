<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const charts = ref()
const number1 = ref('24521人')

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.4, 0.2],
        radius: '80%',
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: '#dadee5',
            borderColor: '#d57f11',
            borderWidth: 10,
            shadowBlur: 100,
            shadowColor: 'rgba(194,23,23,0.25)',
          },
        },
      },
    ],
  })
})
</script>

<template>
  <div class="box1">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span style="color: yellowgreen">99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in number1" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box1 {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    margin-top: 10px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      margin-right: 10px;
    }
  }
  .number {
    margin-top: 30px;
    padding: 10px;
    display: flex;
    span {
      flex: 1;
      height: 60px;
      text-align: center;
      line-height: 60px;
      background: url('../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 40px;
    }
  }
  .charts {
    height: 220px;
    width: 100%;
  }
}
</style>
