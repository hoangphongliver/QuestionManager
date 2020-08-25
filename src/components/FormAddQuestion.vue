<template>
  <div class="app-form">
    <b-form>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-textarea
          id="input-1"
          v-model="form.questionName"
          required
          placeholder="Enter Question Type Name..."
        ></b-textarea>
      </b-form-group>

      <b-form-select v-model="form.rightAnswer" :options="rightAnswerOption" class="mb-3">
        <template v-slot:first>
          <b-form-select-option value="" hidden
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>

      <b-form-group id="input-group-2" label="Answer for 'A'" label-for="input-2">
        <b-form-input
          id="textarea-rows"
          placeholder="Enter 'A' Answer..."
          v-model="form.answer.a"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Answer for 'B'" label-for="input-2">
        <b-form-input
          id="textarea-rows"
          placeholder="Enter 'B' Answer..."
          v-model="form.answer.b"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Answer for 'C'" label-for="input-2">
        <b-form-input
          id="textarea-rows"
          placeholder="Enter 'C' Answer..."
          v-model="form.answer.c"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Answer for 'D'" label-for="input-2">
        <b-form-input
          id="textarea-rows"
          placeholder="Enter 'D' Answer..."
          v-model="form.answer.d"
        ></b-form-input>
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
    },
    rightAnswerOption: {
      type: Array
    }
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.questionItem))
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.form);
    }
  },
  watch: {
    questionItem(value) {
      this.form = JSON.parse(JSON.stringify(value));
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
