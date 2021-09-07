<template>
  <a
      :href="href"
      @click.prevent="go"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },

  methods: {
    go() {
      this.$root.currentRoute = this.href;
      window.history.pushState(null, this.$root.routes[this.href], this.href);
    }
  }
};
</script>