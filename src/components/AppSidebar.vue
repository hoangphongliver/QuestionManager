<template>
  <div class="sidebar">
    <b-sidebar
      id="sidebar-backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
      v-model="visible"
      right
    >
      <div class="sidebar__content mb-5">
        <h4>Quiz</h4>
        <b-list-group>
          <b-list-group-item
            v-for="(item, index) in questionQuizList"
            :key="index"
            @click="onGetQuestionType(item)"
            class="mb-3"
            :class="{ active: questionType === item.name }"
          >
            {{ item.name }}
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="sidebar__content">
        <h4>Learn</h4>
        <b-list-group>
          <b-list-group-item
            v-for="(item, index) in questionLearnList"
            :key="index"
            @click="onGetQuestionType(item)"
            class="mb-3"
            :class="{ active: questionType === item.name }"
          >
            {{ item.name }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <template v-slot:footer="{ hide }">
        <div
          class="footer d-flex text-light justify-content-between align-items-center px-3 py-2 pb-3"
        >
          <b-button
            variant="success"
            size="sm"
            class="mb-2 mr-3"
            @click="goToAdminPage"
            v-if="currentUser.type === 'admin'"
          >
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Quản Lý Câu
            Hỏi!
          </b-button>
          <b-button
            v-if="currentUser.id"
            variant="outline-info"
            class="mb-2"
            @click="onLogout"
          >
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "AppSidebar",
  props: {
    questionTypeList: {
      type: Array
    },
    currentUser: {
      type: Object
    }
  },
  data() {
    return {
      variant: "dark",
      visible: false,
      type: ""
    };
  },
  computed: {
    questionType() {
      return this.$route?.query?.name;
    },

    questionQuizList() {
      return this.questionTypeList.filter(q => q.type === "Quiz");
    },

    questionLearnList() {
      return this.questionTypeList.filter(q => q.type === "Learn");
    }
  },
  methods: {
    onGetQuestionType(item) {
      this.$emit("questionType", item);
      this.visible = false;
    },

    goToAdminPage() {
      this.$router.push("/admin");
    },

    onLogout() {
      localStorage.removeItem("currentUser");
      location.reload();
    }
  }
};
</script>

<style lang="scss">
@import "../assets/_global.scss";
.sidebar {
  font-weight: 500;
  &__content {
    padding: 0 20px;
    h4{
      color: seagreen;
    }
  }
  .footer {
    button {
      width: 100%;
      height: 40px;
    }
  }
}

.b-sidebar {
  width: 100%;

  @include min-sm {
    width: 350px;
  }

  .b-sidebar-header {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;

    .close {
      margin-right: 0 !important;
    }

    svg {
      font-size: 32px;
    }
  }
}

.b-sidebar.b-sidebar-right {
  width: 100%;

  @include min-sm {
    width: 350px;
  }
}

.list-group-item {
  cursor: pointer;
  color: black;
  // box-shadow: 0px 0px 10px 0 rgba(74, 74, 74, 0.25);
  &:hover {
    background: #16a45c;
    color: white;
  }
}

.list-group-item.active {
  border: none;
}

.active {
  background: #16a45c !important;
}
</style>
