<template>
  <main-layout>
    <div>
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
    <div class="notice" :class="uploadedClass" v-html="uploadedMessage"></div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';

export default {
  name: 'Upload',
  components: {MainLayout},
  data() {
    return {
      file: '',
      uploadedClass: '',
      uploadedMessage: '',
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      const requestOptions = {
        method: 'POST',
        'content-type': 'multipart/form-data',
        body: formData
      };
      fetch('http://localhost:90/upload', requestOptions)
          .then(resp => {
            this.uploadedClass = 'success';
            this.uploadedMessage = 'File uploaded with success!';
          })
          .catch(e => {
            console.error(e.message);
            this.uploadedClass = 'error';
            this.uploadedMessage = e.message;
          });
    }
  }
};
</script>

<style>
.notice {
  padding: 10px;
  margin: 20px;
}
  .success {
    background-color: darkseagreen;
    color: white;
  }

  .error {
    background-color: firebrick;
    color: white;
  }
</style>