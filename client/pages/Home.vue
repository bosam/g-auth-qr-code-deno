<template>
  <main-layout>
    <p :class="found ? 'found' : ''">{{ welcomeMessage }}</p>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';

export default {
  name: 'Home',
  components: {MainLayout},
  data() {
    return {
      found: false
    }
  },
  computed: {
    welcomeMessage: function() {
      return this.found ? 'Database exists and is ready for QR code generation.' : 'No databases found. Please upload one.';
    }
  },
  mounted() {
    this.$nextTick(function() {
      const requestOptions = {
        method: 'get',
        mode: 'cors'
      };
      fetch('http://localhost:90/exists', requestOptions)
          .then(response => response.json())
          .then(data => {
            this.found = data.found;
          });
    });
  }
};
</script>

<style>
  .found {color: green;}
</style>