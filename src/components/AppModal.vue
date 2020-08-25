<template>
  <div>
    <!-- <b-button id="show-btn" @click="showModal">Open Modal</b-button> -->
    <b-modal
      :dialog-class="modalClass ? modalClass : 'my-popup'"
      ref="my-modal"
      hide-header
      hide-footer
      id="modal-xl"
      :size="size"
      :centered="centered"
      @hide="onHide"
    >
      <div class="close">
        <span
          class="icon-Icon-Close"
          @click="hideModal"
          v-if="isCloseIcon"
        ></span>
      </div>
      <slot></slot>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    picturePopup: false,
    size: {
      type: String,
      default: () => "xl"
    },
    centered: {
      type: Boolean,
      default: () => true
    },
    type: {
      type: String,
      default: () => ""
    },
    modalClass: {
      type: String,
      default: () => ""
    },
    isCloseIcon: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    onHide(evt) {
      if (evt.trigger === "backdrop") {
        this.handleBackdrop();
      }
    },
    handleBackdrop() {
      this.$emit("backdropClick");
    }
  }
};
</script>

<style lang="scss" scoped></style>
