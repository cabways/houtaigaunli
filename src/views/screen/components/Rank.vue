<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()
const yLabel = ref(['一月', '二月', '三月', '四月', '五月'])
const yData = ref([4000, 1280, 2515, 4500, 500])

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    backgroundColor: '#071347',
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'value',
    },
    tooltip: {
      // 格式化提示内容
      formatter: function (params) {
        return (
          params.name +
          '<br/>' +
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(47,215,255)'></span>" +
          '销量 : ' +
          params.value +
          '万m³'
        )
      },
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          margin: 60,
          textStyle: {
            color: 'rgb(188,217,230)',
            fontSize: 19,
          },
          // 调整左侧文字的3个属性，缺一不可
          verticalAlign: 'bottom',
          align: 'top',
          //调整文字上右下左
          // padding: [0, 0, 45, 12],
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: yLabel.value,
      },
      {
        zlevel: 3,
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: 'rgb(188,217,230)',
            fontSize: '20',
            // padding: [0, 0, 0, 10],
          },
          formatter: function (value) {
            return value + ' 万m³'
          },
        },
        data: yData.value,
      },
    ],
    series: [
      {
        // 内
        type: 'bar',
        barWidth: 20,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: function () {
              return {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#25e7df', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#25e7df00', // 100% 处的颜色
                  },
                ],
              }
            },
          },
        },
        label: {
          show: false,
          position: 'right',
          // distance: 20,
          fontSize: 14,
          color: '#4FA5CB',
          formatter: '{c}%',
        },
        data: yData.value,
        z: 1,
        animationEasing: 'elasticOut',
      },
      {
        // 内
        type: 'bar',
        barWidth: 20,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: function () {
              return {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#25e7df', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#25e7df00', // 100% 处的颜色
                  },
                ],
              }
            },
          },
        },
        label: {
          show: false,
          position: 'right',
          // distance: 20,
          fontSize: 14,
          color: '#4FA5CB',
          formatter: '{c}%',
        },
        data: [533, 243, 114, 345, 323],
        z: 1,
        animationEasing: 'elasticOut',
      },
    ],
  })
})
</script>

<template>
  <div class="box6">
    <div class="top">
      <p class="title">景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="charts6" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box6 {
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
  }
  .charts6 {
    height: 330px;
    width: 100%;
  }
}
</style>