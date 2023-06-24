<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'

const map = ref()

echarts.registerMap('china', chinaJSON)
onMounted(() => {
  let myCharts = echarts.init(map.value)
  myCharts.setOption({
    geo: [
      {
        map: 'china',
        roam: true,
        top: '50px',
        left: '130px',
        bottom: '',
        right: '130px',
        label: {
          show: true,
          color: 'white',
          fontSize: '12px',
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#B9B8FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#323e64', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          opacity: 0.8,
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    series: {
      type: 'lines',
      data: [
        {
          coords: [
            [116.405285, 39.904989],
            [113.665412, 34.757975],
          ],
          lineStyle: {
            color: 'white',
            width: 5,
          },
        },
      ],
      effect: {
        show: true,
        symbol: 'circle',
        color: 'red',
        symbolSize: 10,
      },
    },
  })
})
</script>

<template>
  <div class="box4" ref="map">地图</div>
</template>

<style scoped lang="scss">
.box4 {
}
</style>
