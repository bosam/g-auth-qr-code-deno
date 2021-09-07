<template>
  <main>
    <ul class="topnav">
      <li v-for="(name, route) in routes">
        <v-link :href="route">{{ name }}</v-link>
      </li>
    </ul>

    <slot></slot>
  </main>
</template>

<script>
import VLink from '../components/VLink.vue';

export default {
  components: {VLink},
  computed: {
    routes: function() {
      let rewritten = {};
      for (const [key, value] of Object.entries(this.$root.routes)) {
        rewritten[key] = value.name;
      }
      return rewritten;
    }
  }
};
</script>

<style>
main {
  /* I prefer to put margin at the bottom to scroll past the bottom of the content for readability. */
  margin: 0 auto 4rem;
  /* This width is an arbitrary example. Choose your own value. */
  max-width: 42rem;
}

ol, ul {
  list-style: none;
}
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>