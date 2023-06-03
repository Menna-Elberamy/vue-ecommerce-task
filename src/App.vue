<template>
  <MainHeader @toggle-sidebar="toggleSidebar" />
  <CartAside 
    :isOpen="sidebarOpen" 
    @close="closeCartAside"
    />
  <router-view />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import CartAside from "@/components/cartAside.vue";

export default {
  name: "AppView",
  components: {
    MainHeader,
    CartAside
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(isOpen) {
      this.sidebarOpen = isOpen;
      console.log(this.sidebarOpen)
    },
    closeCartAside() {
      this.sidebarOpen = false;
    },

  }
};
</script>
<style lang="scss">
@import "../src/assets/css/_variables";
@import "../src/assets/css/_mixins";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
