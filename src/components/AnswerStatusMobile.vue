<template>
  <div class="answer-status-mobile">
    <ul>
      <li class="item-first">{{ answerStats.one }}</li>
      <li class="item-second">{{ answerStats.two }}</li>
      <li class="item-third">{{ answerStats.three }}</li>
      <li class="item-fouth">{{ answerStats.four }}</li>
      <AppTimerSetup
        ref="app-timer"
        :startTime="true"
        class="answer-status-mobile__timer"
      />
    </ul>
    <div class="answer-status-mobile__stats">
      <span> {{ value }} / {{ max }} </span>
      <b-progress
        height="25px"
        variant="info"
        :value="value"
        :max="max"
      ></b-progress>
    </div>
  </div>
</template>

<script>
import AppTimerSetup from "../components/AppTimerSetup";

export default {
  name: "AnswerStatusMobile",
  components: {
    AppTimerSetup
  },
  props: {
    max: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    answerStats: {
      type: Object
    }
  },
  methods: {
    start() {
      this.$refs["app-timer"].start();
    },
    stop() {
      this.$refs["app-timer"].stop();
    }
  }
};
</script>

<style lang="scss" scoped>
.answer-status-mobile {
  margin-top: 10px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 20px;
    li {
      color: white;
    }
  }

  &__timer {
    width: 30%;
  }

  .item {
    &-first {
      color: green;
    }

    &-second {
      color: blue;
    }

    &-third {
      color: yellow;
    }

    &-fouth {
      color: #dc3545;
    }
  }

  &__stats {
    position: relative;
    margin-bottom: 20px;
    span {
      position: absolute;
      color: black;
      font-size: 15px;
      left: 20px;
      top: 0px;
      font-weight: bold;
    }
    .active-progress {
      color: white;
    }
  }

  .progress {
    border-radius: 20px;
    background-color: white;
  }
}
</style>
