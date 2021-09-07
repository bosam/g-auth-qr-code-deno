<template>
  <main-layout>
    <div class="card" v-for="qrCode in qrCodes">
      <img :src="qrCode.base64src" :alt="qrCode.name" />
      <div class="container">
        <h4>{{ qrCode.name }}</h4>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';

export default {
  name: 'QR Codes',
  components: {MainLayout},
  data() {
    return {
      qrCodes: []
    }
  },
  mounted() {
    this.$nextTick(function() {
      const requestOptions = {
        method: 'get',
        mode: 'cors'
      };
      fetch('http://localhost:90/qr-list', requestOptions)
          .then(response => response.json())
          .then(data => {
            this.qrCodes = data;
          });
    });
  }
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  opacity: 0.2;
  margin-bottom: 15px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
}

.container {
  padding: 2px 0;
}

img {
  border-radius: 5px 5px 0 0;
  padding: 15px;
}
</style>