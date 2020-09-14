<template>
  <div class="dashboard-actions">
    <div class="dashboard-actions__searching">
      <b-form-input
        v-model="searchPhase"
        placeholder="Enter Search Keyword....."
        @change="onChange"
      ></b-form-input>
      <BIconSearch @click="onSearch" />
      <BIconX v-if="searchPhase" @click="clearSearchPhase" />
    </div>
    <div class="dashboard-actions__sorting">
      <b-form-select v-model="sortBy" @change="onSelectSortBy">
        <b-form-select-option
          :value="item.value"
          v-for="(item, index) in sortByList"
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
import { BIconX } from "bootstrap-vue";

export default {
  name: "DashboardActions",
  components: {
    BIconX
  },
  props: {
    searchPhaseProp: {
      type: String,
      default: ""
    },

    sortByProp: {
      type: String,
      default: "lastUpdated"
    },

    sortByList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchPhase: this.searchPhaseProp,
      sortBy: this.sortByProp
    };
  },
  methods: {
    onChange(event) {
      this.$emit("send:searchPhase", event);
    },

    onSearch(searchPhase) {
      this.$emit("send:searchPhase", this.searchPhase);
    },

    onSelectSortBy(sortBy) {
      this.$emit("send:SortBy", sortBy);
    },

    clearSearchPhase() {
      this.searchPhase = "";
    }
  }
};
</script>

<style lang="scss">
.dashboard-actions {
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-right: 30px;

  &__searching {
    width: 45%;
    position: relative;

    .bi-search {
      cursor: pointer;
      position: absolute;
      right: 11px;
      top: 11px;
    }

    .bi-x {
      cursor: pointer;
      position: absolute;
      right: 35px;
      top: 11px;
      border-radius: 100%;
      /* padding: 10px; */
      background: black;
      color: wheat;
      opacity: 0.5;
    }
  }

  &__sorting {
    width: 45%;
  }
}
</style>
