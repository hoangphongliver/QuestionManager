<template>
  <div class="reviews-answer">
    <div
      class="reviews-answer__content"
      v-for="(item, index) in answerList"
      :key="index"
    >
      <div class="reviews-answer__content__name">
        <span>{{ index + 1 }}</span
        >:
        <h4>{{ item.questionName }}</h4>
        <BIconCheck2
          v-if="item.currentAnswer === item.rightAnswer.toLowerCase()"
          variant="primary"
        />
        <BIconX v-else variant="danger" />
        <p class="no-answer" v-if="!item.currentAnswer">
          Không trả lời!
        </p>
      </div>
      <ul class="reviews-answer__content__answer">
        <li
          v-for="(answer, key) in item.answer"
          :key="key"
          :class="{
            error: item.currentAnswer === key,
            'right-answer': item.rightAnswer.toLowerCase() === key
          }"
        >
          {{ answer }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BIconCheck2, BIconX } from "bootstrap-vue";
export default {
  name: "ReviewsAnswer",
  components: {
    BIconCheck2,
    BIconX
  },
  props: {
    answerList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/_global.scss";
.reviews-answer {
  color: white;
  &__content {
    margin-bottom: 15px;
    @include min-sm {
      margin-bottom: 30px;
    }
    &__name {
      span {
        font-size: 20px;
        font-weight: bold;

        @include min-sm {
          font-size: 28px;
        }
      }

      h4 {
        display: inline;
        font-size: 15px;
        font-weight: bold;
        @include min-sm {
          font-size: 20px;
        }
      }
      p {
        display: inline;
      }

      svg {
        font-size: 25px;
        margin-left: 15px;
        // position: absolute;

        @include min-sm {
          font-size: 35px;
        }
      }
    }

    &__answer {
      font-size: 14px;
      margin-left: 15px;
      @include min-sm {
        font-size: 18px;
        margin-left: 35px;
      }
      li {
        margin: 5px;
        font-weight: bold;
      }
    }
  }
  .error {
    color: #dc3545;
    opacity: 0.85;
  }

  .right-answer {
    color: #007bff;
  }

  .no-answer {
    color: #dc3545;
  }
}
</style>
