<template>
  <Timer :time="prettyTime" />
</template>

<script>
import Timer from "./AppTimer";

export default {
  name: "AppTimerSetup",
  components: {
    Timer
  },
  props: {
    countName: {
      type: String,
      default: () => "countUp"
    },
    timeSetup: {
      type: Number,
      default: () => 10
    }
  },
  data() {
    return {
      isRunning: false,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null
    };
  },
  computed: {
    prettyTime() {
      let time = this.time / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    }
  },
  methods: {
    start() {
      this.isRunning = true;
      if (this.countName === "countUp") {
        this.time = 0;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time >= 0) {
              this.time++;
            }
          }, 1000);
        }
      } else {
        this.time = this.timeSetup;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time > 0) {
              this.time--;
            } else {
              clearInterval(this.timer);
              this.reset();
              alert("het time");
            }
          }, 1000);
        }
      }
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      this.stop();
      this.time = 0;
      this.secondes = 0;
      this.minutes = 0;
      if (this.countName === "countUp") {
        this.start();
      }
    },
    prettyTimeM(time) {
      let timeCount = time / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    }
  }
};
</script>

<style lang="scss">
.app-timer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
