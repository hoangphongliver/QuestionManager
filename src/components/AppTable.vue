<template>
  <div class="app-table">
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :bordered="true"
      @row-clicked="onClickRow"
    >
      <template v-slot:cell(id)="row">
        {{ startPage + row.index + 1 }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="outline-info" @click="onEdit(row.item)">
          <BIconPencilSquare />
        </b-button>
        <b-button variant="outline-danger" @click="onDelete(row.item)">
          <BIconTrash />
        </b-button>
      </template>

      <template v-slot:cell(answer)="row">
        <b-button
          variant="info"
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template v-slot:cell(timeCountDown)="row">
        {{ row.item.timeCountDown }}
        {{ row.item.timeCountDown > 0 ? "Minites" : "" }}
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2" v-for="(item, key) in row.item.answer" :key="key">
            <b-col sm="3" class="text-sm-right">
              <b
                variant="info"
                v-if="row.item.rightAnswer === key.toUpperCase()"
              >
                {{ key.toUpperCase() }}:
              </b>
              <span v-else>{{ key.toUpperCase() }}:</span>
            </b-col>
            <b-col v-if="row.item.rightAnswer === key.toUpperCase()">
              <b>{{ item }}</b></b-col
            >
            <b-col v-else>{{ item }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { BIconTrash, BIconPencilSquare } from "bootstrap-vue";
export default {
  components: {
    BIconTrash,
    BIconPencilSquare
  },
  name: "AppTable",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    startPage: {
      type: Number,
      default: 5
    }
  },
  methods: {
    onEdit(value) {
      this.$emit("onEdit", value);
    },

    onDelete(value) {
      this.$emit("onDelete", value);
    },

    onClickRow(row) {
      this.$emit("onClickRow", row);
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/_global.scss";
.app-table {
  font-size: 14px;

  @include min-lg {
    font-size: 15px;
  }
  button {
    margin-right: 10px;
  }
  .table {
    .tb-id,
    .tb-answer,
    .tb-number-like,
    .tb-right-answer,
    .tb-actions,
    .tb-last-updated,
    .tb-time-count-down,
    .tb-type {
      text-align: center;
    }

    .tb-last-updated {
      width: 15%;
    }

    .tb-name {
      padding-left: 10px;
      width: 18%;
    }

    .tb-desc {
      width: 25%;
    }

    .tb-answer {
      width: 16%;
    }

    .tb-number-like {
      width: 12%;
    }

    .tb-right-answer {
      width: 12%;
    }

    .tb-actions {
      width: 18%;
    }

    .tb-id {
      width: 6%;
    }
  }
}
</style>
