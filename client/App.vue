<template>
  <main-layout />
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';
import Page404 from './pages/Page404.vue';
import Home from './pages/Home.vue';
import Upload from './pages/Upload.vue';
import QrList from './pages/QrList.vue';

export default {
  name: 'app',
  components: {MainLayout, Page404, Home, Upload, QrList},
  data: () => ({
    currentRoute: window.location.pathname,
    routes: {
      '/': Home,
      '/upload': Upload,
      '/qr': QrList
    }
  }),
  computed: {
    ViewComponent() {
      return this.routes[this.currentRoute] || Page404;
    }
  },

  render() {
    return Vue.h(this.ViewComponent);
  },

  created() {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname;
    });
  }
};

</script>

<style>
body {
  /* Personal preferences */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Helvetica Neue", Arial, sans-serif;
  background-color: #fafafa;
  /* Basics from normalize.css */
  margin: 0;
  -webkit-text-size-adjust: 100%;
  font-size: 1rem;
  font-weight: 400;
  /*
    Normalize.css sets line-height to 1.15 as a standard,
    but I prefer 1.5 as the base for all text,
    because it's a bit more readable and spacious.
  */
  line-height: 1.15;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>