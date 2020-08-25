<template>
  <div class="app-narbar">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <div class="container">
        <b-button variant="outline-secondary" v-b-toggle.sidebar-backdrop>
          <span class="navbar-toggler-icon"></span>
        </b-button>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item>EN</b-dropdown-item>
            <b-dropdown-item>VN</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>Hi! User</em>
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AppNavbar"
};
</script>

<style lang="scss">
nav {
  width: 100%;
  &.navbar {
    padding: 1rem;
  }
}
</style>
