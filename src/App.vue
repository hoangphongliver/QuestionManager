<template>
  <div id="app">
    <!-- <HomePage /> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/_global.scss";
#app{
  min-height: 100vh;
}
</style>
