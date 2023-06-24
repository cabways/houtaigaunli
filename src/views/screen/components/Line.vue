<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
    },
    grid: {
      top: 10,
      left: 40,
      bottom: 20,
      right: 0,
    },
    series: [
      {
        type: 'line',
        data: [120, 2130, 180, 2130, 100, 2150, 500, 2450],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<template>
  <div class="box5">
    <div class="top">
      <p class="title">未来三十天游客趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box5 {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 30px;
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
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
