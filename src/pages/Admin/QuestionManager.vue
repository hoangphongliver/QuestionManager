<template>
  <div class="question-manager">
    <div class="container">
      <div class="question-manager__title">
        <div class="question-manager__title__left">
          <b-button variant="success" @click="onGoHomePage">
            <BIconArrowLeft />
          </b-button>
          <h4>Question Manager >>> {{ qustionType }}</h4>
        </div>
      </div>
      <div class="question-manager__actions-top d-flex mb-5">
        <DashboardActions
          :searchPhaseProp="searchPhase"
          :sortByProp="sortBy"
          :sortByList="sortByList"
          @send:searchPhase="saveSearchPhase"
          @send:SortBy="saveSortBy"
        />
        <b-button variant="success" @click="onAddQuestion">
          Add Question
        </b-button>
      </div>
      <AppTable
        :items="questionList"
        :fields="fields"
        :rightAnswerOption="rightAnswerOption"
        :startPage="selectedPerPage * (currentPage - 1)"
        @onEdit="onEdit"
        @onDelete="onDelete"
        v-if="questionList.length"
      />
      <AppPaging
        :currentPages="currentPage"
        :selectedPerPage="selectedPerPage"
        :numberItem="numberQuestion"
        @sent:cuurentPage="saveCurrentPage"
        @on:selectPerPage="selectPerPage"
        v-if="questionList.length"
      />

      <div class="no-question" v-if="!questionList.length">
        Chua co cau hoi cho {{ qustionType }}. Hay them vao nhe!
      </div>
    </div>

    <AppModal ref="modal-admin" size="md">
      <div class="question-type-modal" v-if="type !== 'delete'">
        <div class="question-type-modal__title">
          {{ type === "edit" ? "Edit Question" : "Add Quetion" }}
        </div>
        <FormAddQuestion
          @onSubmit="onSubmit"
          :questionItem="questionItem"
          :isLoading="isLoading"
          :rightAnswerOption="rightAnswerOption"
        />
      </div>
      <div class="confirm-delete" v-else>
        <div class="confirm-delete__title">
          <h4>Are you sure to delete item?</h4>
        </div>
        <div class="confirm-delete__button">
          <b-button variant="outline-primary" @click="onClose">Cancel</b-button>
          <b-button variant="success" @click="onConfirm">
            <b-spinner small v-if="isLoading"></b-spinner>
            Confirm
          </b-button>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppTable from "../../components/AppTable";
import AppModal from "../../components/AppModal";
import FormAddQuestion from "../../components/FormAddQuestion";
import AppPaging from "../../components/AppPaging";
import moment from "moment";
import { BIconArrowLeft } from "bootstrap-vue";
import DashboardActions from "../../components/DashboardActions";

export default {
  name: "QuestionManager",
  components: {
    AppTable,
    AppModal,
    FormAddQuestion,
    AppPaging,
    DashboardActions,
    BIconArrowLeft
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", tdClass: "tb-id", thClass: "tb-id" },
        {
          key: "questionName",
          label: "Question Name",
          tdClass: "tb-question-name",
          thClass: "tb-question-name"
        },
        {
          key: "rightAnswer",
          label: "Right Answer",
          tdClass: "tb-right-answer",
          thClass: "tb-right-answer"
        },
        {
          key: "answer",
          label: "Answer",
          tdClass: "tb-answer",
          thClass: "tb-answer"
        },
        {
          key: "actions",
          label: "Actions",
          tdClass: "tb-actions",
          thClass: "tb-actions"
        }
      ],
      rightAnswerOption: [
        {
          value: "A",
          text: "A"
        },
        {
          value: "B",
          text: "B"
        },
        {
          value: "C",
          text: "C"
        },
        {
          value: "D",
          text: "D"
        }
      ],
      questionItem: {
        id: "",
        CategoryId: "",
        questionName: "",
        rightAnswer: "",
        answer: {
          a: "",
          b: "",
          c: "",
          d: ""
        },
        rightAnswer: ""
      },
      type: "",
      row: "",
      currentPage: 1,
      selectedPerPage: 5,
      searchPhase: "",
      sortBy: "questionName",
      sortByList: [
        { text: "Question Name", value: "questionName" },
        { text: "Right Answer", value: "rightAnswer" },
        { text: "Like", value: "like" }
      ],
      qustionType: ""
    };
  },
  created() {
    this.qustionType = this.$route.query.name;
    this.getAllQuestionList({
      questionTypeID: this.questionTypeID,
      params: {
        page: "",
        limit: "",
        search: "",
        sortBy: ""
      }
    });
    this.getQuestionList({
      questionTypeID: this.questionTypeID,
      params: this.buildParams
    });
  },
  computed: {
    ...mapGetters({
      questionList: "questionItem/questionList",
      isLoading: "questionItem/isLoading",
      alertText: "questionItem/alertText",
      numberQuestion: "questionItem/numberQuestion"
    }),
    questionTypeID() {
      return this.$route.params.id;
    },

    buildParams() {
      const params = {
        page: this.currentPage,
        limit: this.selectedPerPage,
        search: this.searchPhase,
        sortBy: this.sortBy
      };

      return params;
    }
  },
  methods: {
    ...mapActions({
      getQuestionList: "questionItem/getQuestionList",
      deleteQuestionList: "questionItem/deleteQuestionList",
      addQuestionList: "questionItem/addQuestionList",
      updateQuestionList: "questionItem/updateQuestionList",
      getAllQuestionList: "questionItem/getAllQuestionList"
    }),

    onSubmit(form) {
      const params = {
        questionID: this.questionID,
        questionTypeID: this.questionTypeID,
        body: form,
        params: this.buildParams
      };
      if (form.id) {
        this.updateQuestionList(params);
      } else {
        this.addQuestionList(params);
      }
    },

    onClose() {
      this.$refs["modal-admin"].hideModal();
    },

    onEdit(row) {
      this.row = row;
      this.type = "edit";
      this.$refs["modal-admin"].showModal();
      this.questionItem = { ...row };
      this.questionID = row.id;
    },

    onConfirm() {
      this.deleteQuestionList({
        questionID: this.questionID,
        questionTypeID: this.questionTypeID,
        params: this.buildParams
      });
    },

    onDelete(question) {
      this.type = "delete";
      this.$refs["modal-admin"].showModal();
      this.questionID = question.id;
    },

    onAddQuestion() {
      this.currentPage = 1;
      this.type = "add";
      this.questionItem = {
        id: "",
        CategoryId: "",
        questionName: "",
        rightAnswer: "",
        answer: {
          a: "",
          b: "",
          c: "",
          d: ""
        },
        rightAnswer: ""
      };
      this.$refs["modal-admin"].showModal();
    },

    saveCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },

    selectPerPage(parPage) {
      this.currentPage = 1;
      this.selectedPerPage = parPage;
    },

    saveSearchPhase(searchPhase) {
      this.searchPhase = searchPhase;
    },

    saveSortBy(sortBy) {
      this.sortBy = sortBy;
    },

    onGoHomePage() {
      this.$router.push("/admin");
    }
  },
  watch: {
    questionList() {
      this.$refs["modal-admin"].hideModal();
    },

    buildParams: {
      handler(newParams) {
        this.getQuestionList({
          questionTypeID: this.questionTypeID,
          params: newParams
        });
      },
      deep: true
    },

    alertText(alertText) {
      if (alertText) {
        this.$bvToast.toast(`${alertText.text}`, {
          title: alertText.status ? "Success" : "Fail",
          toaster: "b-toaster-top-center",
          autoHideDelay: 3000,
          variant: alertText.status ? "success" : "danger",
          solid: true
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.question-manager {
  &__title {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
      h4 {
        margin-left: 30px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
