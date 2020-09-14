<template>
  <div class="app-form">
    <b-form>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter Question Type Name..."
          @keyup="$v.form.name.$touch()"
        ></b-form-input>
        <p class="error" v-if="!$v.form.name.required && $v.form.name.$dirty">
          Please Enter Question Type Name !
        </p>
      </b-form-group>

      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-select v-model="form.type" :options="options"></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label-for="input-1"
        v-if="form.type === 'Quiz'"
      >
        <b-form-select
          v-model="form.timeCount"
          :options="timeCountOptions"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-textarea
          id="textarea-rows"
          placeholder="Enter Description..."
          rows="4"
          v-model="form.desc"
          @keyup="$v.form.desc.$touch()"
        ></b-form-textarea>
        <p class="error" v-if="!$v.form.desc.required && $v.form.desc.$dirty">
          Please Enter Description !
        </p>
      </b-form-group>

      <div class="app-form__button">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button @click="onSubmit" variant="primary" :disabled="$v.$invalid">
          <b-spinner small v-if="isLoading"></b-spinner>
          {{ form.id ? "Update Question Type" : "Add Question Type" }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  name: "AppForm",
  props: {
    questionItem: {
      type: Object
    },
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        type: "Quiz",
        timeCount: "",
        desc: ""
      },
      options: [
        {
          text: "Quiz",
          value: "Quiz"
        },
        {
          text: "Learn",
          value: "Learn"
        }
      ],
      timeCountOptions: [
        {
          text: "10p",
          value: "10"
        },
        {
          text: "20p",
          value: "20"
        },
        {
          text: "20p",
          value: "20"
        },
        {
          text: "30p",
          value: "30"
        },
        {
          text: "60p",
          value: "60"
        },
        {
          text: "120p",
          value: "120"
        }
      ]
    };
  },
  validations: {
    form: {
      name: {
        required
      },
      desc: {
        required
      }
    }
  },
  mounted() {
    this.form = {
      ...this.questionItem,
      timeCount: this.questionItem.timeCountDown
    };
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$emit("onSubmit", this.form);
      }
    }
  },
  watch: {
    questionItem(value) {
      this.form = value;
    }
  }
};
</script>

<style lang="scss">
.app-form {
  &__content {
    padding: 0 20px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    button {
      width: 48%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-right: 10px;
      }
    }
  }

  .form-group {
    margin-bottom: 25px;
  }

  .error {
    color: #c82333;
  }
}
</style>
