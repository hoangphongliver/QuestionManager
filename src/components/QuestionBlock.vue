<template>
  <div class="questions">
    <div class="questions__name">
      <h2>Câu hỏi</h2>
    </div>
    <div class="questions__content">
      <ul class="questions__content__item">
        <li class="item">1</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuestionBlock",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      questionList: "questionTypeList"
    })
  }
};
</script>

<style lang="scss">
.questions {
  &__name {
    margin-bottom: 30px;
  }

  &__content {
    &__item {
      .item {
        cursor: pointer;
        margin-bottom: 15px;
        padding: 12px 12px 12px 20px;
        background: #f2f3f5;
        border-radius: 7px;

        &:hover {
          background: #16a45c;
          color: white;
        }
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
