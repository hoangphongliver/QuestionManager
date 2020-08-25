<template>
  <div class="question-manager">
    <div class="container">
      <div class="question-manager__title">
        <h4>Question Manager</h4>
        <b-button variant="success" @click="onAddQuestion">
          Add Question
        </b-button>
      </div>
      <AppTable
        :items="questionList"
        :fields="fields"
        :rightAnswerOption="rightAnswerOption"
        @onEdit="onEdit"
        @onDelete="onDelete"
      />
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
          <b-button @click="onClose">Cancel</b-button>
          <b-button variant="primary" @click="onConfirm">
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

export default {
  name: "QuestionManager",
  components: {
    AppTable,
    AppModal,
    FormAddQuestion
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", tdClass: "tb-row1", thClass: "tb-row1" },
        {
          key: "questionName",
          label: "Question Name",
          tdClass: "tb-row2",
          thClass: "tb-row2"
        },
        {
          key: "rightAnswer",
          label: "Right Answer",
          tdClass: "tb-row2",
          thClass: "tb-row2"
        },
        {
          key: "like",
          label: "Number Like",
          tdClass: "tb-row2",
          thClass: "tb-row2"
        },
        {
          key: "answer",
          label: "Answer",
          tdClass: "tb-row3",
          thClass: "tb-row3"
        },
        {
          key: "actions",
          label: "Actions",
          tdClass: "tb-row4",
          thClass: "tb-row4"
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
        answer: {},
        rightAnswer: ""
      },
      type: "",
      row: ""
    };
  },
  created() {
    this.getQuestionList({
      questionTypeID: this.questionTypeID
    });
  },
  computed: {
    ...mapGetters({
      questionList: "questionItem/questionList",
      isLoading: "questionItem/isLoading",
      alertText: "questionItem/alertText"
    }),
    questionTypeID() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      getQuestionList: "questionItem/getQuestionList",
      deleteQuestionList: "questionItem/deleteQuestionList",
      addQuestionList: "questionItem/addQuestionList",
      updateQuestionList: "questionItem/updateQuestionList"
    }),

    onSubmit(form) {
      const params = {
        questionID: this.questionID,
        questionTypeID: this.questionTypeID,
        body: form
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
        questionTypeID: this.questionTypeID
      });
    },

    onDelete(question) {
      this.type = "delete";
      this.$refs["modal-admin"].showModal();
      this.questionID = question.id;
    },

    onAddQuestion() {
      this.type = "add";
      this.questionItem = {
        id: "",
        CategoryId: "",
        questionName: "",
        rightAnswer: "",
        answer: {},
        rightAnswer: ""
      };
      this.$refs["modal-admin"].showModal();
    }
  },
  watch: {
    questionList() {
      this.$refs["modal-admin"].hideModal();
    },
    alertText(alertText) {
      if (alertText) {
        this.$bvToast.toast(`${alertText.text}`, {
          title: alertText.status ? 'Success' : 'Fail',
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

<style lang="scss">
.question-manager {
  padding: 50px 0;

  &__title {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
