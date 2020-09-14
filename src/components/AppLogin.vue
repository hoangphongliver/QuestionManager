<template>
  <div class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-header">
        <h3>Sign In</h3>
        <div class="d-flex justify-content-end social_icon">
          <span><i class="fab fa-facebook-square"></i></span>
          <span><i class="fab fa-google-plus-square"></i></span>
          <span><i class="fab fa-twitter-square"></i></span>
        </div>
      </div>
      <div class="card-body">
        <form>
          <div
            class="input-group form-group"
            :class="{
              'mb-0': $v.users.userName.$invalid && $v.users.userName.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Email..."
              v-model="users.userName"
              @keyup="$v.users.userName.$touch()"
            />
          </div>
          <p class="error">
            {{ userNameErrorText }}
          </p>
          <div
            class="input-group form-group"
            :class="{
              'mb-0': $v.users.password.$invalid && $v.users.password.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Password..."
              v-model="users.password"
              @keyup="$v.users.password.$touch()"
            />
          </div>
          <p class="error">{{ passwordErorrText }}</p>
          <div class="error">
            {{
              loginState.status === false && loginState.text
                ? loginState.text
                : ""
            }}
          </div>
          <div class="row align-items-center remember mt-3">
            <input type="checkbox" />Remember Me
          </div>
          <div class="form-group d-flex justify-content-end">
            <b-button
              variant="success"
              @click="onSignUp"
              :disabled="$v.$invalid"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              Login
            </b-button>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center links">
          Don't have an account?
          <span class="ml-3" @click="showAppRegister">Sign Up</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  name: "AppLogin",
  data() {
    return {
      users: {
        userName: "",
        password: ""
      }
    };
  },
  validations: {
    users: {
      userName: {
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "users/isLoading",
      loginState: "users/loginState"
    }),

    passwordErorrText() {
      let text = "";
      if (!this.$v.users.password.minLength && this.$v.users.password.$dirty) {
        text = "Minlength of Password is 6";
      }
      if (!this.$v.users.password.required && this.$v.users.password.$dirty) {
        text = "Please Enter Password";
      }
      return text;
    },

    userNameErrorText() {
      let text = "";
      if (!this.$v.users.userName.minLength && this.$v.users.userName.$dirty) {
        text = "Minlength of userName is 6";
      }
      if (!this.$v.users.userName.required && this.$v.users.userName.$dirty) {
        text = "Please Enter Password";
      }
      return text;
    }
  },
  methods: {
    ...mapActions({
      showAppSignUp: "homePage/showAppSignUp",
      onLogin: "users/onLogin"
    }),

    showAppRegister() {
      this.showAppSignUp();
    },

    onSignUp() {
      this.onLogin(this.users);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Numans");

html,
body {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
}

.container {
  height: 100%;
  align-content: center;
}

.card {
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  background-color: darkcyan !important;
}

input {
  height: 45px;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
  color: black;
}

.card-footer {
  span {
    cursor: pointer;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
}

.error {
  color: moccasin;
}
</style>
