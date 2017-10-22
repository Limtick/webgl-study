<template>
  <div class="main-content">
    <div class="left-side">
      <left-side></left-side>
    </div>
    <div class="right-side">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftSide from '@/components/LeftSide'
export default {
  name: 'Content',
  components: {
    LeftSide
  }
}
</script>

<style lang="less">
.main-content {
  height: 100%;
  .left-side {
    position: fixed;
    width: 260px;
    top: 0;
    bottom: 0;
    left: 0;
    background: #f5f5f5;
  }

  .right-side {
    position: absolute;
    left: 260px;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    // padding: 10px;
  }
}
</style>
