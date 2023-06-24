<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import moment from 'moment'

const $router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日hh:mm:ss'))
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日hh:mm:ss')
  }, 1000)
})
const goHome = () => {
  $router.push('/home')
}
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="lBtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">随心所欲大数据可视化平台</div>
    </div>
    <div class="right">
      <span class="rBtn">数据统计</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;

    .lBtn {
      width: 100px;
      height: 40px;
      float: right;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 30px;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
    }
  }

  .right {
    flex: 1;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;

    .rBtn {
      width: 100px;
      height: 40px;
      float: left;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }

    .time {
      color: #29fcff;
      line-height: 40px;
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>
