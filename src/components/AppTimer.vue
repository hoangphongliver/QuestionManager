<template>
  <div class="timer">
    <h1>{{ time | prettify }}</h1>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    time: {
      type: String
    }
  },
  filters: {
    prettify: function(value) {
      let data = value?.split(":");
      let minutes = data && data[0];
      let secondes = data && data[1];
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (secondes < 10) {
        secondes = "0" + secondes;
      }
      return minutes + ":" + secondes;
    }
  }
};
</script>

<style lang="scss" scpoed>
@import "../assets/_global.scss";
.timer {
  font-size: 15px;
  padding: 7px 20px;
  width: 100%;
  border: 2px solid white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  @include min-sm {
    padding: 12px 30px;
  }
  h1 {
    font-size: 15px;
    margin: 0;

    @include min-sm {
      font-size: 20px;
    }
  }
}
</style>
