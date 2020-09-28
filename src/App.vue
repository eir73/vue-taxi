<template>
  <div id="app">
   <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "login") + "-layout";
    },
  },
  components: {
    LoginLayout,
    MainLayout,
  },
};
</script>

