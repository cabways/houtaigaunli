<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

function data() {
  let d = []
  for (let i = 0; i < 24; i++) {
    d.push({ name: i + '~' + (i + 1), value: Math.random() * 100 })
  }
  return d
}

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center',
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0px',
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      position: ['48.5%', '49.2%'],
      backgroundColor: 'rgba(50,50,50,0)',
      textStyle: {
        color: 'yellow',
        fontWeight: 'bold',
      },
      formatter: '{d}%',
    },
    series: [
      {
        name: '上网时间',
        type: 'pie',
        radius: ['5%', '70%'],
        roseType: 'area',
        color: ['#3fa7dc'],
        data: data(),
        labelLine: {
          normal: {
            show: false,
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: 449.9,
        radius: '82%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          formatter: '{value}',
          textStyle: {
            color: '#63869e',
          },
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: [
              [0.25, '#63869e'],
              [0.75, '#ffffff'],
              [1, '#63869e'],
            ],
            width: '40%',
            shadowColor: '#0d4b81', //默认透明
            shadowBlur: 40,
            opacity: 1,
          },
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: '#ffffff',
            width: 2,
          },
        },
        axisLabel: {
          formatter: function (v) {
            return v ? v : ''
          },
          textStyle: {
            color: 'red',
            fontWeight: 700,
          },
        },
        itemStyle: {
          normal: {
            color: 'green',
            width: 2,
          },
        },
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: 449.9,
        radius: '72%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          formatter: '{value}',
          textStyle: {
            color: '#63869e',
          },
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: [[1, '#E8E8E8']],
            width: '10%',
            opacity: 0.8,
          },
        },
        splitLine: {
          show: true,
          length: '92%',
          lineStyle: {
            color: 'grey',
            width: '1',
          },
        },
        axisLabel: {
          show: false,
          formatter: function (v) {
            return v ? v : ''
          },
          textStyle: {
            color: '#fb5310',
            fontWeight: 700,
          },
        },
        itemStyle: {
          normal: {
            color: 'green',
            width: 2,
            borderWidth: 3,
          },
        },
      },
    ],
  })
})
</script>

<template>
  <div class="box8">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts8" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box8 {
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
  .charts8 {
    width: 100%;
    height: 300px;
  }
}
</style>
