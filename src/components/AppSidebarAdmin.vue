<template>
  <div class="app-sidebar-admin">
    <b-sidebar id="sidebar-backdrop-admin" backdrop shadow right>
      <div class="px-3 py-2"></div>
      <template v-slot:footer="{ hide }">
        <div
          class="footer d-flex text-light justify-content-between align-items-center px-3 py-2 pb-3"
        >
          <b-button variant="success" size="sm" class="mb-2 mr-3">
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Thêm Admin
          </b-button>
          <b-button variant="outline-info" class="mb-2" @click="onLogout">
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppSidebarAdmin",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onLogout() {
      localStorage.removeItem("currentUser");
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-sidebar-admin {
  .footer {
    button {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
