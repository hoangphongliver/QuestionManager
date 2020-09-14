<template>
  <div class="page-not-found">
    <div class="page-not-found__title">
      <div class="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
          alt=""
        />
      </div>
      <h1>App Trắc Nghiệm</h1>
      <h3>06 - Tạo Base Component (Part 2)</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageNotFound",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    goHomePage() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.page-not-found {
  width: 100%;
  height: 100vh;
  background-color: #1ae28a;
  background: linear-gradient(-45deg, #209077 0%, #1ae28a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: cursive;
  &__title {
    text-align: center;
    margin-bottom: 100px;
    h1 {
      font-size: 8rem;
      margin-bottom: 70px;
    }

    h3 {
      cursor: pointer;
      font-size: 4rem;
    }

    .logo {
      display: flex;
      justify-content: center;
      img {
        width: 300px;
        height: 300px;
      }
    }
  }
}
</style>
