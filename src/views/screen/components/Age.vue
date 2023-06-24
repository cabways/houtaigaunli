<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '40px',
      right: '20px',
      orient: 'vertical',
      textStyle: {
        color: '#29fcff',
        fontSize: 12,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Vue' },
          { value: 735, name: 'React' },
          { value: 580, name: 'Node' },
          { value: 484, name: 'Vite' },
          { value: 300, name: 'ES6' },
        ],
      },
    ],
  })
})
</script>

<template>
  <div class="box3">
    <div class="top">
      <p class="title">人口比例</p>
      <p class="bg"></p>
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
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
