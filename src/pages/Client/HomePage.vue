<template>
  <div class="home-page">
    <div class="home-page__haader">
      <AppSidebar />
      <AppNavbar />
      <AppModal :centered="true" ref="test">Alo</AppModal>
    </div>
    <div class="home-page__content">
      <div class="container">
        <div class="home-page__content__question">
          <QuestionBlock />
        </div>
        <div class="home-page__content__status">
          status o day
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppSidebar from "../../components/AppSidebar.vue";
import AppNavbar from "../../components/AppNavbar.vue";
import AppModal from "../../components/AppModal.vue";
import QuestionBlock from "../../components/QuestionBlock.vue";

export default {
  name: "HomePage",
  components: {
    AppSidebar,
    AppNavbar,
    AppModal,
    QuestionBlock
  },
  created() {
    this.getQuestionTypeList("aa");
  },
  methods: {
    ...mapActions({
      getQuestionTypeList: "getQuestionTypeList"
    }),
    openModal() {
      this.$refs["test"].showModal();
    }
  }
};
</script>

<style lang="scss">
.home-page {
  // padding: 50px 0;
  &__content {
    padding: 50px 0;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    &__question {
      width: 60%;
    }

    &__status {
      width: 35%;
    }
  }
}
</style>
