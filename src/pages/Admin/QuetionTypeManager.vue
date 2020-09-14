<template>
  <div class="dashboard">
    <div class="container">
      <!-- <div class="dashboard__title">
        <b-button variant="success" @click="goHomePage">
          Home Page
        </b-button>
      </div> -->
      <div class="dashboard__actions-top mb-5 d-flex">
        <DashboardActions
          :searchPhaseProp="searchPhase"
          :sortByProp="sortBy"
          :sortByList="sortByList"
          @send:searchPhase="saveSearchPhase"
          @send:SortBy="saveSortBy"
        />
        <b-button variant="success" @click="onAddQuestion">
          Add Question Type
        </b-button>
      </div>
      <AppTable
        :items="questionList"
        :fields="fields"
        :startPage="selectedPerPage * (currentPage - 1)"
        @onEdit="onEdit"
        @onDelete="onDelete"
        @onClickRow="onClickRow"
      />
      <AppPaging
        :currentPages="currentPage"
        :selectedPerPage="selectedPerPage"
        :numberItem="numberQuestionType"
        @sent:cuurentPage="saveCurrentPage"
        @on:selectPerPage="selectPerPage"
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
          <h4>Are you sure to delete '{{ questionItem.name }}'?</h4>
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
import AppTable from "../../components/AppTable";
import AppNavbar from "../../components/AppNavbar";
import AppForm from "../../components/AppForm";
import { mapActions, mapGetters } from "vuex";
import AppModal from "../../components/AppModal";
import AppPaging from "../../components/AppPaging";
import moment from "moment";
import { BIconSearch, BIconSortUp } from "bootstrap-vue";
import DashboardActions from "../../components/DashboardActions";

export default {
  name: "Dashboard",
  components: {
    AppTable,
    AppForm,
    AppModal,
    AppPaging,
    BIconSearch,
    BIconSortUp,
    DashboardActions,
    AppNavbar
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID", tdClass: "tb-id", thClass: "tb-id" },
        { key: "name", label: "Name", tdClass: "tb-name", thClass: "tb-name" },
        { key: "type", label: "Type", tdClass: "tb-type", thClass: "tb-type" },
        {
          key: "timeCountDown",
          label: "Time CD",
          tdClass: "tb-time-count-down",
          thClass: "tb-time-count-down"
        },
        {
          key: "desc",
          label: "Description",
          tdClass: "tb-desc",
          thClass: "tb-desc"
        },
        {
          key: "lastUpdated",
          label: "Last Updated",
          tdClass: "tb-last-updated",
          thClass: "tb-last-updated"
        },
        {
          key: "actions",
          label: "Actions",
          tdClass: "tb-actions",
          thClass: "tb-actions"
        }
      ],
      type: "",
      questionItem: {
        id: "",
        name: "",
        desc: "",
        type: "Quiz",
        timeCount: 10,
        lastUpdated: ""
      },
      currentPage: 1,
      selectedPerPage: 5,
      searchPhase: "",
      sortBy: "lastUpdated",
      sortByList: [
        { text: "Name", value: "name" },
        { text: "Description", value: "desc" },
        { text: "Last Updated", value: "lastUpdated" }
      ]
    };
  },
  created() {
    const params = {
      page: this.currentPage,
      limit: 5,
      search: this.searchPhase,
      sortBy: this.sortBy
    };
    this.getAllQuestionTypeList({
      page: "",
      limit: "",
      search: "",
      sortBy: ""
    });
    this.getQuestionTypeList(params);
  },
  computed: {
    ...mapGetters({
      questionList: "questionType/questionTypeList",
      isLoading: "questionType/isLoading",
      numberQuestionType: "questionType/numberQuestionType",
      alertText: "questionType/alertText"
    })
  },
  methods: {
    ...mapActions({
      getQuestionTypeList: "questionType/getQuestionTypeList",
      deleteQuestionTypeList: "questionType/deleteQuestionTypeList",
      addQuestionTypeList: "questionType/addQuestionTypeList",
      updateQuestionTypeList: "questionType/updateQuestionTypeList",
      getAllQuestionTypeList: "questionType/getAllQuestionTypeList"
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
      this.currentPage = 1;
      this.questionItem = {
        id: "",
        name: "",
        desc: "",
        type: "Quiz",
        timeCount: 10,
        lastUpdated: moment(new Date()).format("DD-MM-YYYY, HH:mm:ss")
      };
      this.$refs["modal-admin"].showModal();
    },

    onConfirm() {
      if (this.type === "delete") {
        this.currentPage = 1;
        this.deleteQuestionTypeList(this.questionParams());
      }
    },

    onSubmit(questionType) {
      const body = {
        name: questionType.name,
        desc: questionType.desc,
        type: questionType.type,
        timeCountDown:
          questionType.type === "Quiz" ? questionType.timeCount : "No Support",
        lastUpdated: moment(new Date()).format("DD-MM-YYYY, HH:mm:ss")
      };
      if (questionType.id) {
        this.updateQuestionTypeList({
          questionID: questionType.id,
          body,
          params: this.buildParams()
        });
      } else {
        this.addQuestionTypeList({
          body,
          params: this.buildParams()
        });
      }
      this.currentPage = 1;
    },

    onClickRow(question) {
      const path = `admin/question-manager/${question.id}`;
      const query = {
        name: question.name
      };
      this.$router.push({
        path,
        query
      });
    },

    questionParams() {
      const params = {
        questionID: this.questionItem.id,
        body: {},
        params: this.buildParams()
      };
      return params;
    },

    goHomePage() {
      this.$router.push("/");
    },

    saveCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.getQuestionTypeList(this.buildParams());
    },

    selectPerPage(itemPerPage) {
      this.currentPage = 1;
      this.selectedPerPage = itemPerPage;
      this.getQuestionTypeList(this.buildParams());
    },

    saveSearchPhase(searchPhase) {
      this.searchPhase = searchPhase;
      this.getQuestionTypeList(this.buildParams());
    },

    saveSortBy(sortBy) {
      this.sortBy = sortBy;
      this.getQuestionTypeList(this.buildParams());
    },

    buildParams() {
      const params = {
        page: this.currentPage,
        limit: this.selectedPerPage,
        search: this.searchPhase,
        sortBy: this.sortBy,
        order: this.sortBy == "lastUpdated" ? "desc" : "asc"
      };

      return params;
    }
  },

  watch: {
    questionList() {
      this.$refs["modal-admin"].hideModal();
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
.dashboard {
  // padding: 50px 0;

  &__title {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  &__actions-top {
    display: flex;
    justify-content: space-between;

    &__searching {
      width: 40%;
      position: relative;

      svg {
        cursor: pointer;
        position: absolute;
        right: 11px;
        top: 11px;
      }
    }

    &__sorting {
      width: 40%;
    }
  }
}
</style>
