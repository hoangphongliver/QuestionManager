<template>
  <div class="app-form">
    <b-form>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-textarea
          id="input-1"
          v-model="form.questionName"
          required
          placeholder="Enter Question Name..."
          @keyup="$v.form.questionName.$touch()"
        ></b-textarea>
        <p
          class="error"
          v-if="!$v.form.questionName.required && $v.form.questionName.$dirty"
        >
          Please Enter Question Name !
        </p>
      </b-form-group>

      <b-form-select v-model="form.rightAnswer" class="mb-3">
        <b-form-select-option value="" hidden>
          -- Please select an option --
        </b-form-select-option>

        <b-form-select-option
          :value="key.toUpperCase()"
          v-for="(item, key) in form.answer"
          :key="key"
        >
          {{ key.toUpperCase() }}
        </b-form-select-option>
        <p
          class="error"
          v-if="!$v.form.rightAnswer.required && $v.form.rightAnswer.$dirty"
        >
          Please select Right answer !
        </p>
      </b-form-select>

      <b-form-group
        id="input-group-2"
        class="app-form__answer"
        :label="`Answer for '${key.toUpperCase()}'`"
        label-for="input-2"
        v-for="(item, key) in form.answer"
        :key="key"
      >
        <b-form-input
          id="textarea-rows"
          :placeholder="`Enter '${key.toUpperCase()}' Answer...`"
          v-model="form.answer[key]"
          @keyup="$v.form.answer[key].$touch()"
        ></b-form-input>
        <p
          class="error"
          v-if="!$v.form.answer[key].required && $v.form.answer[key].$dirty"
        >
          Please Enter Answer !
        </p>

        <div class="app-form__answer__actions" v-if="key === lastKey">
          <b-button
            v-if="lastKey !== 'b'"
            @click="delLastField"
            variant="danger"
            class="mr-3"
          >
            <BIconTrash />
          </b-button>

          <b-button v-if="lastKey !== 'f'" @click="addForm" variant="success">
            <BIconPlus />
          </b-button>
        </div>
      </b-form-group>

      <div class="app-form__button">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button @click="onSubmit" variant="primary" :disabled="$v.$invalid">
          <b-spinner small v-if="isLoading"></b-spinner>
          {{ form.id ? "Update Question" : "Add Question" }}
        </b-button>
      </div>
    </b-form>

    {{ $v.form.rightAnswer.$invalid }}
  </div>
</template>

<script>
import Vue from "vue";
import { BIconTrash, BIconPlus } from "bootstrap-vue";

import {
  required,
  requiredIf,
  minLength,
  between
} from "vuelidate/lib/validators";

export default {
  name: "AppForm",
  components: {
    BIconTrash,
    BIconPlus,
  },
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
  computed: {
    lastKey() {
      const listKey = Object.keys(this.form.answer).length;

      return Object.keys(this.form.answer)[listKey - 1];
    }
  },
  validations: {
    form: {
      questionName: {
        required
      },
      rightAnswer: {
        required
      },
      answer: {
        a: {
          required
        },
        b: {
          required
        },
        c: {
          required: requiredIf(form => {
            return Object.keys(form).includes("c");
          })
        },
        d: {
          required: requiredIf(form => {
            return Object.keys(form).includes("d");
          })
        },
        e: {
          required: requiredIf(form => {
            return Object.keys(form).includes("e");
          })
        },
        f: {
          required: requiredIf(form => {
            return Object.keys(form).includes("f");
          })
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.form);
    },

    delLastField() {
      if (Object.keys(this.form.answer).length > 2) {
        Vue.delete(this.form.answer, this.lastKey);
      }
    },

    addForm() {
      const length = Object.keys(this.form.answer).length;
      switch (length) {
        case 2:
          Vue.set(this.form.answer, "c", "");
          break;
        case 3:
          Vue.set(this.form.answer, "d", "");
          break;
        case 4:
          Vue.set(this.form.answer, "e", "");
          break;
        case 5:
          Vue.set(this.form.answer, "f", "");
          break;
        default:
          break;
      }
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

  &__answer {
    position: relative;

    &__actions {
      position: absolute;
      right: 0;
      top: -10px;
    }
  }

  .form-group {
    margin-bottom: 25px;
  }
}
</style>
