<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#29fcff',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<template>
  <div class="box3">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box3 {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
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
  .sex {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .man {
      margin: 30px;
      width: 111px;
      height: 115px;
      background: url('../images/man-bg.png') no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin: 30px;
      width: 111px;
      height: 115px;
      text-align: center;
      background: url('../images/woman-bg.png') no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: #29fcff;
  }
  .charts {
    width: 100%;
    height: 70px;
  }
}
</style>
