<template>
  <div class="answer-status">
    <div class="answer-status__stats">
      <span :class="{ 'active-progress': isActiveProgressBar }">
        {{ answerStats.one }} / {{ max }}
      </span>
      <b-progress
        height="25px"
        variant="success"
        :value="answerStats.one"
        :max="max"
      ></b-progress>
    </div>
    <div class="answer-status__stats">
      <span :class="{ 'active-progress': isActiveProgressBar }">
        {{ answerStats.two }} / {{ max }}
      </span>
      <b-progress
        height="25px"
        variant="info"
        :value="answerStats.two"
        :max="max"
      ></b-progress>
    </div>
    <div class="answer-status__stats">
      <span :class="{ 'active-progress': isActiveProgressBar }">
        {{ answerStats.three }} / {{ max }}
      </span>
      <b-progress
        height="25px"
        variant="warning"
        :value="answerStats.three"
        :max="max"
      ></b-progress>
    </div>
    <div class="answer-status__stats">
      <span :class="{ 'active-progress': isActiveProgressBar }">
        {{ answerStats.four }} / {{ max }}
      </span>
      <b-progress
        height="25px"
        variant="danger"
        :value="answerStats.four"
        :max="max"
      ></b-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerStatus",
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
  computed: {
    isActiveProgressBar() {
      const recentOne = this.answerStats.one / this.max;
      const recentTwo = this.answerStats.two / this.max;
      const recentThree = this.answerStats.three / this.max;
      const recentFour = this.answerStats.four / this.max;
      if (
        recentOne > 1 / 8 ||
        recentTwo > 1 / 8 ||
        recentThree > 1 / 8 ||
        recentFour > 1 / 8
      ) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
.answer-status {
  &__list-item {
    display: flex;
    justify-content: space-between;
  }

  &__stats {
    position: relative;
    margin-bottom: 20px;
    span {
      position: absolute;
      color: #16a45c;
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
