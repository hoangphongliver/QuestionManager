<template>
  <div class="quiz-mode">
    <div class="quiz-mode__content">
      <div class="quiz-mode__content__question" v-if="isShowQuestionBlock">
        <QuestionBlock
          :activeQuestion="activeQuestion"
          :currentQuestion="currentQuestion"
          @onAnswer="onAnswer"
          :isLoading="isLoading"
        />
      </div>
      <div class="quiz-mode__reviews mb-5" v-if="isReviews">
        <ReviewsAnswer class="mb-3" :answerList="answerList" />
        <b-button variant="primary" @click="onWorkAgain">
          Làm Lại Bài Nào ^^
        </b-button>
      </div>
      <div class="quiz-mode__stats" v-if="!isShowQuestionBlock && !isReviews">
        <div class="mb-5">
          Bạn đã hoàn thành bài Quiz, số câu trả lời đùng của bạn là:
          <span class="ml-3"
            >{{ countRightAnswer }} / {{ questionList.length }}</span
          >
        </div>
        <b-button variant="primary" @click="onReviews">
          Reviews Answer
        </b-button>
      </div>
      <div class="quiz-mode__content__stats" v-if="!isReviews">
        <span> {{ currentQuestion + 1 }} / {{ questionList.length }} </span>
        <b-progress
          height="25px"
          variant="info"
          :value="currentQuestion + 1"
          :max="questionList.length"
        ></b-progress>
      </div>
      <div class="quiz-mode__content__button" v-if="!isReviews">
        <div class="stats" v-if="!isReviews">
          <span ref="current-question-text">
            {{ currentQuestion + 1 }} / {{ questionList.length }}
          </span>
          <b-progress
            height="25px"
            variant="info"
            :value="currentQuestion + 1"
            :max="questionList.length"
          ></b-progress>
        </div>
        <div
          class="submit"
          v-if="
            currentQuestion === questionList.length - 1 && isShowQuestionBlock
          "
        >
          <b-button variant="primary" @click="onSubmit" class="mr-5">
            Submit
          </b-button>
        </div>
        <div class="next" v-if="currentQuestion !== questionList.length - 1">
          <b-button variant="primary" @click="onNext">
            Next
          </b-button>
        </div>
        <div class="question-type">
          {{ route.name && route.name.toUpperCase() }}
        </div>
        <AppTimerSetup
          :countName="'countDown'"
          :timeSetup="questionTypeObj.timeCountDown * 60"
          ref="app-timer"
          class="mb-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import QuestionBlock from "../../components/QuestionBlock.vue";
import AppTimerSetup from "../../components/AppTimerSetup";
import ReviewsAnswer from "./ReviewsAnswer";

export default {
  name: "QuizMode",
  components: {
    QuestionBlock,
    AppTimerSetup,
    ReviewsAnswer
  },
  props: {
    questionTypeObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentQuestion: 0,
      answerList: [],
      key: "",
      countRightAnswer: 0,
      isShowQuestionBlock: true,
      isReviews: false
    };
  },
  mounted() {
    if (this.isLogin) {
      this.$refs["app-timer"].start();
    }

    console.log(this.$refs);
  },
  computed: {
    ...mapGetters({
      questionList: "questionItem/questionList",
      isLoading: "questionItem/isLoading",
      isLogin: "users/isLogin",
      currentUser: "users/currentUser"
    }),

    activeQuestion() {
      return {
        ...this.questionList[this.currentQuestion],
        currentQuestion: this.currentQuestion
      };
    },

    route() {
      return this.$route.query;
    }
  },
  methods: {
    ...mapActions({
      getQuestionList: "questionItem/getQuestionList"
    }),
    onAnswer(key) {
      this.key = key;
      this.$emit("on:AnswerQuizMode");
    },

    onNext() {
      if (this.isLogin) {
        this.answerList.push({
          ...this.activeQuestion,
          currentAnswer: this.key
        });
        this.currentQuestion += 1;
        if (this.currentQuestion >= this.questionList.length) {
          this.currentQuestion = this.questionList.length - 1;
        }
        this.key = "";
      } else {
        this.$emit("on:AnswerQuizMode");
      }
    },

    onSubmit() {
      this.isShowQuestionBlock = false;
      this.onNext();
      this.$refs["app-timer"].stop();
      this.answerList.forEach(a => {
        if (a.rightAnswer === a.currentAnswer.toUpperCase()) {
          this.countRightAnswer += 1;
        }
      });
    },

    onReviews() {
      this.isReviews = true;
    },

    onWorkAgain() {
      // this.$refs["app-timer"].start();
      this.isShowQuestionBlock = true;
      this.isReviews = false;
      this.currentQuestion = 0;
      this.answerList = [];
      this.countRightAnswer = 0;
      const questionTypeID = this.$route.query.questionTypeID;
      this.getQuestionList({
        questionTypeID,
        params: this.buildParams()
      });
    },

    buildParams() {
      const params = {
        page: "",
        limit: "",
        search: "",
        sortBy: ""
      };

      return params;
    }
  },

  watch: {
    route() {
      this.currentQuestion = 0;
    },

    questionList() {
      if (this.isLogin) {
        this.$refs["app-timer"]?.start();
        this.isShowQuestionBlock = true;
        this.isReviews = false;
        this.currentQuestion = 0;
        this.answerList = [];
        this.countRightAnswer = 0;
      }
    },

    currentUser(user) {
      if (user.id) {
        this.$refs["app-timer"]?.start();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/_global.scss";
.quiz-mode {
  width: 100%;

  display: flex;
  justify-content: space-between;

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include min-sm {
      flex-direction: row;
    }
    &__question {
      width: 100%;

      @include min-sm {
        width: 58%;
        min-width: 660px;
      }

      .question {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    &__stats {
      position: relative;
      margin-bottom: 20px;
      margin-top: 30px;
      @include min-sm {
        display: none;
      }
      span {
        position: absolute;
        font-size: 15px;
        left: 20px;
        top: 0px;
        font-weight: bold;
        color: white;
      }
      .active-progress {
        color: white;
      }
    }

    &__button {
      width: 100%;

      @include min-sm {
        width: 30%;
      }
      margin-top: 20px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      @include min-sm {
        flex-direction: column;
      }

      .stats {
        display: none;
        order: 2;
        margin-bottom: 20px;
        position: relative;
        margin-top: 30px;
        color: white;

        @include min-sm {
          display: block;
        }
        span {
          position: absolute;
          color: white;
          font-size: 15px;
          left: 20px;
          top: 0px;
          font-weight: bold;
        }
        .active-progress {
          color: white;
        }
      }

      .question-type {
        padding: 10px;
        border: 2px solid white;
        width: 100%;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 20px;
        color: white;
        font-weight: bold;
        display: none;

        @include min-sm {
          order: 2;
          display: block;
        }
      }

      .timer {
        width: 100%;
        order: 1;
        // margin-right: 20px;

        @include min-sm {
          order: 3;
          margin-right: 0;
        }
      }

      .next {
        width: 100%;
        order: 2;
        margin-left: 20px;
        button {
          width: 100%;
        }

        @include min-sm {
          margin-left: 0;
          flex: 1;
          order: 1;
          flex-direction: column;
        }
      }

      .submit {
        order: 2;
        width: 100%;
        margin-left: 20px;
        button {
          width: 100%;
        }
        @include min-sm {
          margin-left: 0;
          flex: 1;
          order: 1;
        }
      }
    }
  }

  &__stats {
    color: white;
    span {
      font-size: 30px;
    }

    button {
      width: 100%;
    }
  }
}
</style>
