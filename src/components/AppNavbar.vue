<template>
  <div class="app-narbar">
    <b-navbar toggleable="lg" type="dark">
      <div class="container">
        <div class="app-narbar__app-name" @click="goHomePage">
          MASTER JS
        </div>

        <b-navbar-nav>
          <div class="avatar" v-if="isLogin">
            <img :src="currentUser.avatar" alt="" />
          </div>
          <div class="login-btn" v-if="isLogin">
            <em>{{ currentUser.name }}</em>
          </div>
          <div class="login-btn" v-else @click="onLogin">
            Login or Register !
          </div>
        </b-navbar-nav>

        <div
          v-if="!sidebarId"
          class="app-narbar__logo"
          v-b-toggle.sidebar-backdrop
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          v-if="sidebarId"
          class="app-narbar__logo"
          v-b-toggle.sidebar-backdrop-admin
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppNavbar",
  props: {
    sidebarId: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      isLogin: "users/isLogin",
      currentUser: "users/currentUser"
    })
  },
  methods: {
    ...mapActions({
      showLoginModal: "homePage/showLoginModal"
    }),
    onLogin() {
      this.showLoginModal();
    },

    goHomePage() {
      if (this.$route.path.indexOf("/admin") !== -1) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/_global.scss";
.app-narbar {
  .container {
    padding-bottom: 20px;
    border-bottom: 2px solid white;
  }

  &__app-name {
    color: white;
    font-weight: 600;
    font-size: 42px;
    position: relative;
    font-family: cursive;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
    @include min-sm {
      font-size: 50px;
      text-align: left;
      width: initial;
      flex: 1;
      margin-bottom: 0;
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0;
      height: 5px;
      background: white;
      display: none;
    }
  }

  &__logo {
    width: 48px;
    height: 45px;
    border-radius: 4px;
    border: 3px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    outline: none;
    &:hover {
      opacity: 0.6;
    }
    span {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 4px 0;
      &::before {
        content: "";
        position: absolute;
        height: 4px;
        width: 60%;
        background: white;
      }
    }
  }

  .login-btn {
    color: white;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

.navbar-nav {
  margin-right: 30px;
  align-items: center;
  flex-direction: row;
}

.avatar {
  margin-right: 10px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid white;
  }
}

nav {
  width: 100%;
  &.navbar {
    padding: 1rem;
  }
}

.btn-outline-light {
  border: 3px solid;
  &:hover {
    background: #16a45c;
  }
}
</style>
