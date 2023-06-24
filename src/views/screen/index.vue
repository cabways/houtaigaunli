<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/Top.vue'
import Tourist from './components/Tourist.vue'
import Age from './components/Age.vue'
import Sex from './components/Sex.vue'
import Map from './components/Map.vue'
import Line from '@/views/screen/components/Line.vue'
import Year from '@/views/screen/components/Year.vue'
import Rank from '@/views/screen/components/Rank.vue'
import Couter from '@/views/screen/components/Couter.vue'

let screen = ref()

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Couter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('@/views/screen/images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        padding-top: 60px;
        .map {
          flex: 2.3;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .rank {
          flex: 1.3;
        }
        .year {
          flex: 1;
        }
        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>
