<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    backgroundColor: '#03213D',
    color: ['#5090FF', '#01B3E4'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF',
      },
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '10%',
      top: '30px',
      containLabel: true,
    },

    legend: {
      show: true,
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: ['魅力值', '能力值'],
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#BDD8FB',
          fontSize: 12,
        },
      },
      axisLabel: {
        // interval:0,
        color: '#BDD8FB',
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      data: [
        '橘梨纱',
        '美竹铃',
        '天海翼',
        '泷泽萝拉',
        '樱井莉亚',
        '铃原爱蜜莉',
        '铃原爱蜜莉2',
      ],
    },
    yAxis: {
      type: 'value',
      min: 0,
      minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#BDD8FB',
        align: 'center',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          // type: 'dashed', // dotted 虚线
        },
      },
      splitArea: { show: false },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        fontFamily: 'Bebas',
        color: '#BDD8FB',
      },
    },
    series: [
      {
        type: 'line',
        // symbol: "none",
        // showSymbol: false,
        smooth: true, // 是否曲线
        name: '魅力值', // 图例对应类别
        data: [4000, 6000, 7000, 2000, 5000, 7000, 9000], // 纵坐标数据
        areaStyle: {
          // 区域颜色
          // color: new graphic.LinearGradient(0, 0, 0, 1, [
          // 	{
          // 		offset: 0,
          // 		color: "#5090FF",
          // 	},
          // 	{
          // 		offset: 1,
          // 		color: "#1057E5",
          // 	},
          // ]),
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.1,
                color: '#5090FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#1057E500', // 100% 处的颜色
              },
            ],
          },
        },
      },
      {
        type: 'line',
        smooth: true,
        name: '能力值',
        data: [1000, 4000, 5000, 6000, 3000, 8000, 7000],
        areaStyle: {
          // color: new graphic.LinearGradient(0, 0, 0, 1, [
          // 	{
          // 		offset: 0,
          // 		color: "#01B3E4",
          // 	},
          // 	{
          // 		offset: 1,
          // 		color: "#86DCF3",
          // 	},
          // ]),
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 0, //左
            y2: 1, //上
            colorStops: [
              {
                offset: 0.1,
                color: '#01B3E4', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#86DCF300', // 100% 处的颜色
              },
            ],
          },
        },
      },
    ],
  })
})
</script>

<template>
  <div class="box7">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts2" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box7 {
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
  .charts2 {
    width: 100%;
    height: 270px;
  }
}
</style>
