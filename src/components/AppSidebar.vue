<template>
  <div class="sidebar">
    <b-sidebar
      id="sidebar-backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
      width="400px"
    >
      <div class="sidebar__content">
        <h4>Chọn Loại Câu Hỏi Ở Đây Nhé !</h4>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "AppSidebar",
  data() {
    return {
      variant: "dark"
    };
  }
};
</script>

<style lang="scss">
.sidebar {
  &__content {
    padding: 0 20px;
  }
}
</style>
