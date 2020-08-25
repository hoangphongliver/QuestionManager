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
        {{ row.index + 1 }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="onEdit(row.item)">Edit</b-button>
        <b-button variant="info" @click="onDelete(row.item)">Delete</b-button>
      </template>

      <template v-slot:cell(answer)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2" v-for="(item, key) in row.item.answer" :key="key">
            <b-col sm="3" class="text-sm-right">
              <b variant="info" v-if="row.item.rightAnswer === key.toUpperCase()">
                {{ key.toUpperCase() }}:
              </b>
              <span v-else>{{ key.toUpperCase() }}:</span>
            </b-col>
            <b-col v-if="row.item.rightAnswer === key.toUpperCase()"
              ><b>{{ item }}</b></b-col
            >
            <b-col v-else>{{ item }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "AppTable",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onEdit(value) {
      this.$emit("onEdit", value);
      console.log(this.selectedRigthAnswer);
    },

    onDelete(value) {
      this.$emit("onDelete", value);
    },

    onClickRow(row) {
      this.$emit("onClickRow", row.id);
    }
  }
};
</script>

<style lang="scss">
.app-table {
  button {
    margin-right: 10px;
  }
}
</style>
