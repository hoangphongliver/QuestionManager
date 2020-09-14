<template>
  <div class="questions">
    <div class="questions__name">
      <div class="name">
        <h2 v-if="!isLoading">
          <span>{{ activeQuestion.currentQuestion + 1 }}:</span>
          {{ activeQuestion.questionName }}
        </h2>
        <h2 class="loading" v-else></h2>
      </div>
      <!-- <div class="like">
        <span>{{ activeQuestion.like }}</span>
        <BIconHeart :font-scale="'2.6'"></BIconHeart>
      </div> -->
    </div>
    <div class="questions__content">
      <ul class="questions__content__item" v-if="!isLoading">
        <li
          class="item"
          :class="{ bounce: !isRight && keyAnswer === key }"
          v-for="(item, key) in activeQuestion.answer"
          :key="key"
          @click="onClickAnswer(key)"
        >
          <span :class="{ 'active-ratio': keyAnswer === key }"></span>
          {{ item }}
        </li>
      </ul>
      <ul class="questions__content__loading" v-else>
        <li class="item" v-for="(item, key) in listAnswer" :key="key"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as constant from "../shared/constant.js";
import { BIconHeart } from "bootstrap-vue";

export default {
  name: "QuestionBlock",
  components: {
    BIconHeart
  },
  props: {
    activeQuestion: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean
    },
    isRight: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      listAnswer: [1, 2, 3, 4],
      keyAnswer: ""
    };
  },
  computed: {
    ...mapGetters({
      questionList: "questionTypeList"
    })
  },
  methods: {
    onClickAnswer(key) {
      this.keyAnswer = key;
      this.$emit("onAnswer", key);
    }
  },
  watch: {
    activeQuestion() {
      this.keyAnswer = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/_global.scss";
.questions {
  min-width: 100%;
  &__name {
    min-width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    @include min-sm {
      margin-bottom: 30px;
    }
    h2 {
      min-height: 56px;
      font-size: 20px;

      @include min-sm {
        font-size: 32px;
      }
    }

    span {
      font-size: 25px;

      @include min-sm {
        font-size: 45px;
      }
    }

    .loading {
      border-radius: 25px;
      background: white;
      @include background-shimmer($base-color: white, $shimmer-color: #f2f3f5);
    }

    .name {
      width: 100%;

      @include min-sm {
        width: 85%;
      }
    }

    .like {
      width: 10%;
      cursor: pointer;
      display: none;
      @include min-sm {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
      }
      span {
        font-size: 16px;
        position: absolute;
        left: 50%;
        top: 3px;
        transform: translateX(-50%);
        color: pink;
        font-weight: bold;
      }

      svg {
        color: pink;
      }
    }
  }

  &__content {
    &__item,
    &__loading {
      .item {
        cursor: pointer;
        margin-bottom: 15px;
        padding: 12px 12px 12px 25px;
        background: #f2f3f5;
        border-radius: 25px;
        transition: 0.3s;
        font-weight: 500;
        position: relative;
        font-size: 15px;
        min-height: 42px;
        @include min-sm {
          min-height: 48px;
        }
        &:hover {
          // background: #16a45c;
          color: #16a45c;
          padding-left: 45px;
        }

        span {
          display: block;
          width: 20px;
          height: 20px;
          position: absolute;
          right: 20px;
          top: 14px;
          border: 1px solid #16a45c;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          &::before {
            content: "";
            display: none;
            width: 12px;
            height: 12px;
            position: absolute;
            border: 1px solid #16a45c;
            border-radius: 50%;
            background: #16a45c;
          }
        }

        .active-ratio {
          &::before {
            display: flex;
          }
        }
      }
    }
    &__loading {
      .item {
        min-height: 42px;
        @include min-sm {
          min-height: 48px;
        }
        @include background-shimmer(
          $base-color: #f2f3f6,
          $shimmer-color: white
        );
      }
    }
  }
}
.custom-control {
  margin-bottom: 20px;
  padding-left: 0 !important;
}

.custom-control-label {
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
  background: #f2f3f5;
  width: 100%;
  padding: 15px;
  border-radius: 4px;

  &::before {
    top: 17px !important;
    right: -2.5rem !important;
    left: initial !important;
  }
  &::after {
    top: 17px !important;
    right: -2.5rem !important;
    left: initial !important;
  }
}
</style>
