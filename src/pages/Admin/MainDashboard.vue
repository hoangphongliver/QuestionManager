<template>
  <div class="main-dashboard">
    <AppNavbar sidebarId="sidebar-backdrop-admin" />
    <AppSidebarAdmin />
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavbar from "../../components/AppNavbar";
import AppSidebarAdmin from "../../components/AppSidebarAdmin";
export default {
  components: {
    AppNavbar,
    AppSidebarAdmin
  },
  name: "MainDashboard"
};
</script>

<style lang="scss" scoped>
.app-narbar {
  background: #16a45c;
  margin-bottom: 100px;
  .navbar {
    .container {
      border-bottom: none !important;
    }
  }
}
</style>
