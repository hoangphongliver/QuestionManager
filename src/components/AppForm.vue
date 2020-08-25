<template>
  <div class="app-form">
    <b-form>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter Question Type Name..."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-textarea
          id="textarea-rows"
          placeholder="Enter Description..."
          rows="4"
          v-model="form.desc"
        ></b-form-textarea>
      </b-form-group>

      <div class="app-form__button">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button @click="onSubmit" variant="primary">
          <b-spinner small v-if="isLoading"></b-spinner>
          {{ form.id ? "Update Question" : "Add Question" }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";

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
        desc: ""
      }
    };
  },
  mounted() {
    this.form = { ...this.questionItem };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.form);
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
}
</style>
