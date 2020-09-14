<template>
  <div class="upload-file">
    <div class="upload-file__progress">
      <b-progress
        variant="danger"
        v-if="uploadProgress"
        :value="uploadProgress"
        max="100"
        height="5px"
      ></b-progress>
    </div>
    <div class="upload-file__input">
      <b-form-input
        :class="{ error: isError }"
        ref="inputShow"
        v-model="imageValue"
        type="text"
        @click="$refs.fileInput.click()"
        readonly
        placeholder="Upload Avatar"
      />
      <input
        hidden
        type="file"
        ref="fileInput"
        @change="previewImage"
        formControlName="file"
      />
      <!-- <b-button @click="onUpload" variant="success">Upload</b-button> -->
    </div>
    <div class="upload-file__error" v-if="isError">Please Choose File!</div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UploadFile",
  data() {
    return {
      imageData: null,
      uploadProgress: 0,
      isLoading: false,
      isError: false,
      imageValue: ""
    };
  },
  methods: {
    previewImage(event) {
      this.uploadProgress = 0;
      if (event.target.files && event.target.files[0]) {
        this.uploadProgress = 0;
        this.imageData = event.target.files[0];
        this.imageValue = this.imageData.name;
        this.isError = false;
        this.onUpload();
      }
    },

    onUpload() {
      if (this.imageData?.name) {
        this.isError = false;
        this.isLoading = true;
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);

        storageRef.on(
          "state_changed",
          snapshot => {
            this.uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.log(err);
          },
          () => {
            this.uploadProgress = 100;
            this.isLoading = false;
            storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.$emit("send:ImageURL", downloadURL);
            });
          }
        );
      } else {
        this.isError = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-file {
  &__input {
    display: flex;
  }

  &__error {
    text-align: left;
    color: red;
  }
}

.error {
  border: 1px solid red !important;
}
</style>
