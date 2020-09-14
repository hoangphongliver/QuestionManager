<template>
  <div class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-header">
        <h3>Sign Up</h3>
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
              'mb-0': $v.users.name.$invalid && $v.users.name.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input
              v-model="users.name"
              type="text"
              class="form-control"
              placeholder="Full Name"
              @keyup="$v.users.name.$touch()"
            />
          </div>
          <p
            class="error"
            v-if="!$v.users.name.required && $v.users.name.$dirty"
          >
            Please Enter Username !
          </p>
          <div
            class="input-group form-group"
            :class="{
              'mb-0': $v.users.email.$invalid && $v.users.email.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input
              v-model="users.email"
              type="text"
              class="form-control"
              placeholder="Email"
              @keyup="$v.users.email.$touch()"
            />
          </div>
          <p class="error">
            {{ emailErrorText }}
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
              placeholder="Password"
              v-model="users.password"
              @keyup="$v.users.password.$touch()"
            />
          </div>
          <p class="error">
            {{ passwordErrorText }}
          </p>
          <div
            class="input-group form-group"
            :class="{
              'mb-0':
                $v.users.confirmPassword.$invalid &&
                $v.users.confirmPassword.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="users.confirmPassword"
              @keyup="$v.users.confirmPassword.$touch()"
            />
          </div>
          <p class="error">{{ comfirmPasswordErrorText }}</p>
          <!-- <div
            class="input-group form-group"
            :class="{
              'mb-0': $v.users.address.$invalid && $v.users.address.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Address"
              v-model="users.address"
              @keyup="$v.users.address.$touch()"
            />
          </div>
          <p
            class="error"
            v-if="!$v.users.address.required && $v.users.address.$dirty"
          >
            Please Enter Address !
          </p> -->
          <div
            class="input-group form-group"
            :class="{
              'mb-0':
                $v.users.phoneNumber.$invalid && $v.users.phoneNumber.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Phone"
              v-model="users.phoneNumber"
              @keyup="$v.users.phoneNumber.$touch()"
            />
          </div>
          <p class="error">
            {{ phoneErrorText }}
          </p>
          <!-- <div
            class="input-group form-group"
            :class="{
              'mb-0': $v.users.birthday.$invalid && $v.users.birthday.$dirty
            }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Birthday"
              v-model="users.birthday"
              @keyup="$v.users.birthday.$touch()"
            />
          </div>
          <p
            class="error"
            v-if="!$v.users.birthday.required && $v.users.birthday.$dirty"
          >
            Please Enter Birthday !
          </p> -->

          <div class="input-group form-group">
            <FormUpload class="form-upload" @send:ImageURL="saveURL" />
            <img class="ml-5" :src="imageURL" alt="" />
          </div>

          <div class="form-group d-flex justify-content-end">
            <b-button variant="info" class="mr-3" @click="showAppLogin">
              Back Login
            </b-button>
            <b-button
              @click="onRegister"
              variant="info"
              :disabled="$v.$invalid"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              Register
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormUpload from "./FormUpload";
import {
  required,
  minLength,
  between,
  sameAs,
  email,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "AppRegister",
  components: {
    FormUpload
  },
  data() {
    return {
      users: {
        birthday: "",
        avatar: "",
        name: "",
        type: "client",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: ""
      },
      imageURL: ""
    };
  },
  validations: {
    users: {
      // birthday: {
      //   required
      // },
      avatar: {
        required
      },
      name: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
        // regexx: function(value) {
        //   const containsUppercase = /[A-Z]/.test(value);
        //   const containsLowercase = /[a-z]/.test(value);
        //   const containsNumber = /[0-9]/.test(value);
        //   const containsSpecial = /[#?!@$%^&*-]/.test(value);
        //   return (
        //     !containsUppercase ||
        //     !containsLowercase ||
        //     !containsNumber ||
        //     !containsSpecial
        //   );
        // }
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      },
      phoneNumber: {
        required,
        numeric,
        minLength: minLength(8)
      }
      // address: {
      //   required
      // }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "users/isLoading"
    }),

    emailErrorText() {
      let text = "";
      if (!this.$v.users.email.required && this.$v.users.email.$dirty) {
        text = "Plesea Enter Email!";
      }
      if (!this.$v.users.email.email && this.$v.users.email.$dirty) {
        text = "Plesea Enter Right Email!";
      }
      return text;
    },

    comfirmPasswordErrorText() {
      let text = "";
      if (
        !this.$v.users.confirmPassword.sameAsPassword &&
        this.$v.users.confirmPassword.$dirty
      ) {
        text = "Plesea Enter Same Password!";
      }
      return text;
    },

    passwordErrorText() {
      let text = "";
      if (!this.$v.users.password.required && this.$v.users.password.$dirty) {
        text = "Plesea Enter Password!";
      }
      if (!this.$v.users.password.minLength && this.$v.users.password.$dirty) {
        text = "Minlength of Password is 6!";
      }

      if (this.$v.users.password.regexx && this.$v.users.password.$dirty) {
        text =
          "Password must have contains Uppercase , contains Lowercase , contains Number , contains Special!";
      }

      return text;
    },

    phoneErrorText() {
      let text = "";
      if (
        !this.$v.users.phoneNumber.required &&
        this.$v.users.phoneNumber.$dirty
      ) {
        text = "Plesea Enter Phone Number!";
      }
      if (
        !this.$v.users.phoneNumber.numeric &&
        this.$v.users.phoneNumber.$dirty
      ) {
        text = "Phone Number is Numeric!";
      }

      if (
        !this.$v.users.phoneNumber.minLength &&
        this.$v.users.phoneNumber.$dirty
      ) {
        text = "Minlength of Phone Number is 8!";
      }
      return text;
    }
  },
  methods: {
    ...mapActions({
      showAppSignIn: "homePage/showAppSignIn",
      onAddUser: "users/onAddUser"
    }),

    showAppLogin() {
      this.showAppSignIn();
    },

    onRegister() {
      this.onAddUser(this.users);
    },

    saveURL(url) {
      this.$v.users.avatar.$touch();
      this.imageURL = url;
      this.users.avatar = url;
      console.log(this.users);
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

.input-group {
  justify-content: space-between;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
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
.error {
  color: moccasin;
}

.form-upload {
  width: 65%;
}
</style>
