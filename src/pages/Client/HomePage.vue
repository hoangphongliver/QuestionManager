<template>
  <div class="home-page">
    <div class="home-page__haader">
      <AppSidebar
        :currentUser="currentUser"
        :questionTypeList="questionTypeList"
        @questionType="onQuestionType"
      />
      <AppNavbar />
    </div>
    <div class="home-page__content" v-if="appMode === 'Learn'">
      <div class="container">
        <div
          class="home-page__content__question"
          v-if="currentQuestion !== questionList.length"
        >
          <QuestionBlock
            class="question-block"
            :activeQuestion="activeQuestion"
            :currentQuestion="currentQuestion"
            :isRight="isRight"
            @onAnswer="onAnswer"
            :isLoading="isLoading"
          />
        </div>
        <div
          class="mt-5"
          v-if="currentQuestion && currentQuestion === questionList.length"
        >
          <h4 class="complete">Bạn đã hoàn thành bài thi!</h4>
          <b-button variant="success" @click="workAgain">
            Làm Lại Lần Nữa Nào! ^^
          </b-button>
        </div>
        <div class="home-page__content__status">
          <div class="question-type">
            {{ questionType && questionType.toUpperCase() }}
          </div>
          <AppTimerSetup ref="app-timer" class="mb-3" />
          <AnswerStatus
            :max="questionList.length"
            :value="currentQuestion"
            :answerStats="answerStats"
          />
        </div>
        <div v-if="!questionList.length">
          Chua co cau hoi cho {{ questionType }}
        </div>

        <div class="home-page__content__status-mobile">
          <AnswerStatusMobile
            :max="questionList.length"
            :value="currentQuestion"
            :answerStats="answerStats"
            ref="answer-mobile"
          />
        </div>
      </div>
    </div>
    <div class="home-page__content" v-else>
      <div class="container">
        <QuizMode
          :activeQuestion="activeQuestion"
          :currentQuestion="currentQuestion"
          :questionTypeObj="questionTypeObj"
          @on:AnswerQuizMode="onAnswerQuizMode"
        />
      </div>
    </div>
    <AppModal
      @backdropClick="backdropClick"
      :centered="true"
      :isCloseIcon="true"
      ref="app-login"
      size="md"
    >
      <div class="app-authen">
        <AppLogin v-if="isShowSignIn" />
        <AppRegister v-if="isShowSignUp" />
      </div>
    </AppModal>
    <b-toast
      id="my-toast"
      :variant="status.status ? 'success' : 'danger'"
      toaster="b-toaster-top-center"
      solid
    >
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">{{
            status.status ? "Success" : "Fail"
          }}</strong>
        </div>
      </template>
      {{ status.text }}
    </b-toast>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppSidebar from "../../components/AppSidebar.vue";
import AppNavbar from "../../components/AppNavbar.vue";
import AppModal from "../../components/AppModal.vue";
import QuestionBlock from "../../components/QuestionBlock.vue";
import * as constant from "../../shared/constant";
import AnswerStatus from "../../components/AnswerStatus";
import AppLogin from "../../components/AppLogin";
import AppRegister from "../../components/AppRegister";
import QuizMode from "../Client/QuizMode";
import AppTimerSetup from "../../components/AppTimerSetup";
import AnswerStatusMobile from "../../components/AnswerStatusMobile";

export default {
  name: "HomePage",
  components: {
    AppSidebar,
    AppNavbar,
    AppModal,
    QuestionBlock,
    AnswerStatus,
    AppLogin,
    AppRegister,
    QuizMode,
    AppTimerSetup,
    AnswerStatusMobile
  },
  data() {
    return {
      currentQuestion: 0,
      appMode: "Learn",
      answerStatus: {
        status: false,
        text: ""
      },
      questionType: "",
      answerListStatus: [],
      answerStats: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      status: {},
      isRight: true,
      questionTypeObj: {},
      pageLoaded: false
    };
  },
  created() {
    const params = {
      page: "",
      limit: "",
      search: "",
      sortBy: ""
    };
    this.getQuestionTypeList(params);
    const query = this.$route.query;
    this.questionType = query?.name;
  },
  mounted() {
    this.pageLoaded = true;
  },
  computed: {
    ...mapGetters({
      questionTypeList: "questionType/questionTypeList",
      questionList: "questionItem/questionList",
      isLoading: "questionItem/isLoading",
      isShowLoginModal: "homePage/isShowLoginModal",
      isShowSignUp: "homePage/isShowSignUp",
      isShowSignIn: "homePage/isShowSignIn",
      currentUser: "users/currentUser",
      isLogin: "users/isLogin",
      userStatus: "users/userStatus"
    }),

    activeQuestion() {
      return {
        ...this.questionList[this.currentQuestion],
        currentQuestion: this.currentQuestion
      };
    }
  },
  methods: {
    ...mapActions({
      getQuestionTypeList: "questionType/getQuestionTypeList",
      getQuestionList: "questionItem/getQuestionList",
      showLoginModal: "homePage/showLoginModal"
    }),
    openModal() {
      this.$refs["test"].showModal();
    },

    onQuestionType(value) {
      this.questionTypeObj = value;
      this.appMode = value.type;
      this.$refs["app-timer"]?.start();
      this.questionType = value.name;
      this.currentQuestion = 0;
      this.answerStats = {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      };
      this.getQuestionList({
        questionTypeID: value.id,
        params: this.buildParams()
      });
      this.$router
        .push({
          path: "/",
          query: {
            name: value.name,
            questionTypeID: value.id,
            mode: value.type
          }
        })
        .catch(err => {});
    },

    onAnswerQuizMode() {
      if (!this.isLogin) {
        this.showLoginModal();
      }
    },

    onAnswer(answer) {
      if (this.isLogin) {
        if (!this.answerListStatus.includes(answer)) {
          this.answerListStatus.push(answer);
        }
        if (answer.toUpperCase() === this.activeQuestion.rightAnswer) {
          const rightAnwserList = constant.rightAnwserList;
          this.answerStatus = {
            status: true,
            text: rightAnwserList[this.randomItem(rightAnwserList)]
          };
          this.currentQuestion += 1;
          if (this.answerListStatus.length === 1) {
            this.answerStats.one += 1;
          }
          if (this.currentQuestion === this.questionList.length) {
            this.currentQuestion = this.questionList.length;
            this.$refs["app-timer"].stop();
            this.$refs["answer-mobile"].stop();
          }

          this.isRight = true;
        } else {
          this.isRight = false;
          const errorList = constant.errorAnswer;
          this.answerStatus = {
            status: false,
            text: errorList[this.randomItem(errorList)]
          };
        }
      } else {
        this.showLoginModal();
      }
    },

    randomItem(array) {
      return Math.floor(Math.random() * array.length);
    },

    workAgain() {
      this.$refs["app-timer"].start();
      this.$refs["answer-mobile"].start();
      this.currentQuestion = 0;
      this.answerStats = {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      };
      const questionTypeID = this.$route.query.questionTypeID;
      this.getQuestionList({
        questionTypeID,
        params: this.buildParams()
      });
    },

    backdropClick() {
      this.showLoginModal();
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
    questionTypeList(question) {
      const route = this.$route.query;
      let questionID = "";
      this.appMode = route.mode ? route.mode : question[0].type;
      this.questionTypeObj = question[0];
      this.getQuestionList({
        questionTypeID: route.questionTypeID
          ? route.questionTypeID
          : question[0].id,
        params: this.buildParams()
      });
      this.questionType = route.name ? route.name : question[0].name;
      this.$router
        .push({
          path: "/",
          query: {
            name: route.name ? route.name : question[0].name,
            questionTypeID: route.questionTypeID
              ? route.questionTypeID
              : question[0].id,
            mode: this.appMode
          }
        })
        .catch(err => {});
    },

    questionList() {
      if (this.isLogin) {
        this.$refs["app-timer"]?.start();
        this.$refs["answer-mobile"]?.start();
      }
    },
    answerStatus(newVal) {
      this.$bvToast.toast(`${newVal.text}`, {
        title: newVal.status ? "Success" : "Fail",
        toaster: "b-toaster-top-center",
        autoHideDelay: 1500,
        variant: newVal.status ? "success" : "danger",
        solid: true
      });
    },
    currentQuestion(currentQuestion) {
      switch (this.answerListStatus.length) {
        case 1:
          this.answerStats.onQuestionType += 1;
          break;
        case 2:
          this.answerStats.two += 1;
          break;
        case 3:
          this.answerStats.three += 1;
          break;
        case 4:
          this.answerStats.four += 1;
          break;
        default:
          break;
      }

      this.answerListStatus.length = 0;
    },

    isShowLoginModal(isShow) {
      if (isShow) {
        this.$refs["app-login"].showModal();
      } else {
        this.$refs["app-login"].hideModal();
      }
    },

    currentUser(user) {
      if (user.id) {
        this.$refs["app-timer"]?.start();
        this.$refs["answer-mobile"]?.start();
      }
      this.$refs["app-login"].hideModal();
      this.$bvToast.toast(`Success`, {
        title: "Login Successfully",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000,
        variant: "success",
        solid: true
      });
    },

    userStatus(newVal) {
      this.$bvToast.toast(`${newVal.text}`, {
        title: newVal.status ? "Success" : "Fail",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000,
        variant: newVal.status ? "success" : "danger",
        solid: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/_global.scss";
.home-page {
  // padding: 50px 0;
  min-height: 100vh;
  background-color: #1ae28a;
  background: linear-gradient(-45deg, #209077 0%, #1ae28a 100%);
  &__content {
    @include min-sm {
      padding: 50px 0;
    }
  }

  .container {
    display: flex;
    // align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;

    @include min-sm {
      flex-direction: row;
    }

    .complete {
      color: white;
      margin-bottom: 20px;
    }
  }

  &__content {
    &__question {
      width: 100%;

      @include min-sm {
        width: 58%;
      }
      .question {
        min-width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    &__status {
      margin-top: 10px;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      color: white;
      font-weight: bold;
      display: none;

      @include min-sm {
        width: 35%;
        display: flex;
      }
      .answer-status {
        width: 100%;
      }

      .question-type {
        padding: 10px;
        border: 2px solid;
        width: 100%;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    }

    &__status-mobile {
      display: block;
      @include min-sm {
        display: none;
      }
    }

    &__image {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      img {
        width: 35%;
        height: 350px;
      }
    }
  }
}
</style>
