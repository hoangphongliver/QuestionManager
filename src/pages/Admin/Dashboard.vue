<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard__title">
        <b-button variant="success" @click="onAddQuestion">
          Add Question Type
        </b-button>
      </div>
      <AppTable
        :items="questionList"
        :fields="fields"
        @onEdit="onEdit"
        @onDelete="onDelete"
        @onClickRow="onClickRow"
      />
    </div>
    <AppModal ref="modal-admin" size="md">
      <div class="question-type-modal" v-if="type !== 'delete'">
        <div class="question-type-modal__title">
          {{ type === "edit" ? "Edit Question" : "Add Quetion" }}
        </div>
        <AppForm
          :isLoading="isLoading"
          @onSubmit="onSubmit"
          :questionItem="questionItem"
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
import AppTable from "../../components/AppTable";
import AppForm from "../../components/AppForm";
import { mapActions, mapGetters } from "vuex";
import AppModal from "../../components/AppModal";
export default {
  name: "Dashboard",
  components: {
    AppTable,
    AppForm,
    AppModal
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", tdClass: "tb-row1", thClass: "tb-row1" },
        { key: "name", label: "Name", tdClass: "tb-row2", thClass: "tb-row2" },
        {
          key: "desc",
          label: "Description",
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
      type: "",
      questionItem: {
        id: "",
        name: "",
        desc: ""
      }
    };
  },
  created() {
    this.getQuestionTypeList("aa");
  },
  computed: {
    ...mapGetters({
      questionList: "questionType/questionTypeList",
      isLoading: "questionType/isLoading"
    })
  },
  methods: {
    ...mapActions({
      getQuestionTypeList: "questionType/getQuestionTypeList",
      deleteQuestionTypeList: "questionType/deleteQuestionTypeList",
      addQuestionTypeList: "questionType/addQuestionTypeList",
      updateQuestionTypeList: "questionType/updateQuestionTypeList"
    }),

    onEdit(item) {
      this.type = "edit";
      this.questionItem = item;
      this.$refs["modal-admin"].showModal();
    },

    onDelete(item) {
      this.type = "delete";
      this.questionItem = item;
      this.$refs["modal-admin"].showModal();
    },

    onClose() {
      this.$refs["modal-admin"].hideModal();
    },

    onAddQuestion() {
      this.type = "add";
      this.questionItem = {
        id: "",
        name: "",
        desc: ""
      };
      this.$refs["modal-admin"].showModal();
    },

    onConfirm() {
      if (this.type === "delete") {
        this.deleteQuestionTypeList(this.questionParams());
      }
    },

    onSubmit(questionType) {
      console.log(questionType);
      const body = {
        name: questionType.name,
        desc: questionType.desc
      };
      if (questionType.id) {
        this.updateQuestionTypeList({
          questionID: questionType.id,
          body
        });
      } else {
        this.addQuestionTypeList(body);
      }
    },

    onClickRow(questionID) {
      this.$router.push(`/question-manager/${questionID}`);
    },

    questionParams() {
      const params = {
        questionID: this.questionItem.id,
        body: {}
      };
      return params;
    }
  },

  watch: {
    questionList() {
      this.$refs["modal-admin"].hideModal();
    }
  }
};
</script>

<style lang="scss">
.dashboard {
  padding: 50px 0;

  &__title {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end;
  }
}

.question-type-modal {
  &__title {
    margin-bottom: 20px;
    font-weight: bold;
  }
}

.confirm-delete {
  padding: 10px 15px 10px 15px;
  &__title {
    margin-bottom: 40px;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-right: 10px;
      }
    }
  }
}

.tb-row4,
.tb-row1 {
  text-align: center;
}

.tb-row2 {
  padding-left: 10px;
}

.tb-row4 {
  width: 25%;
}

.tb-row1 {
  width: 6%;
}
</style>
