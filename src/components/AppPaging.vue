<template>
  <div class="app-paging mt-5">
    <div class="app-paging__paging">
      <b-button
        class="app-paging__paging_next"
        variant="outline-success"
        :disabled="currentPage === 1"
        @click="onPrev"
      >
        <BIconChevronLeft />
      </b-button>
      <ul class="app-paging__paging__list-item">
        <li
          class="item"
          v-for="(item, index) in totalPage"
          :key="index"
          @click="changePage(item)"
          :class="{ active: currentPage === index + 1 }"
        >
          {{ item }}
        </li>
      </ul>
      <b-button
        class="app-paging__paging__prev"
        variant="outline-success"
        :disabled="currentPage === listPage.length"
        @click="onNext"
      >
        <BIconChevronRight />
      </b-button>
    </div>
    <div class="app-paging__item-per-page">
      <b-form-select v-model="selected" @change="onSelectItem">
        <b-form-select-option
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        >
          {{ item.text }}
        </b-form-select-option>
      </b-form-select>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { BIconChevronLeft, BIconChevronRight } from "bootstrap-vue";

export default {
  name: "AppPaging",
  components: {
    BIconChevronLeft,
    BIconChevronRight
  },
  props: {
    currentPages: {
      type: Number,
      default: 1
    },
    selectedPerPage: {
      type: Number,
      default: 5
    },
    numberItem: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: this.currentPages,
      options: [
        { value: 5, text: 5 },
        { value: 10, text: 10 },
        { value: 25, text: 25 },
        { value: 50, text: 50 },
        { value: 100, text: 100 }
      ],
      selected: this.selectedPerPage
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.numberItem / this.selectedPerPage);
    },
    listPage() {
      let allPage = [];
      for (let i = 1; i <= this.totalPage; i++) {
        allPage.push(i);
      }

      return allPage;
    }
  },
  methods: {
    onPrev() {
      this.currentPage -= 1;
    },

    onNext() {
      this.currentPage += 1;
    },

    changePage(page) {
      this.currentPage = page;
    },

    onSelectItem(item) {
      this.selected = item;
      this.$emit("on:selectPerPage", item);
    }
  },

  watch: {
    currentPage(newPage) {
      this.$emit("sent:cuurentPage", newPage);
    },

    currentPages(newPage) {
      this.currentPage = newPage;
    },

    selectedPerPage(newPage) {
      this.selected = newPage;
    }
  }
};
</script>

<style lang="scss">
.app-paging {
  display: flex;
  &__paging {
    display: flex;
    flex: 1;
    width: 80%;
    &__list-item {
      display: flex;
      padding: 0 5px;
      .item {
        padding: 6px 16px;
        margin: 0 5px;
        background: white;
        border: 1px solid #28a745;
        color: #28a745;
        font-weight: bold;
        cursor: pointer;
        border-radius: 4px;
        opacity: 0.6;
        &:hover {
          opacity: 0.95;
        }
      }

      .active {
        opacity: 1;
        color: white;
        background: #28a745 !important;
      }
    }
  }

  &__item-per-page {
    width: 20%;
  }
}
</style>
