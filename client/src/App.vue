<template>
  <div>
    <MenuBar />
    <div class="wrapper">
      <RouterView class="min-vh-100"/>
    </div>
    <AlertItem />
    <FooterBar />
  </div>
</template>

<script>
import MenuBar from "./components/layout/MenuBar.vue";
import AlertItem from "./components/AlertItem.vue";
import FooterBar from "./components/layout/FooterBar.vue";

export default {
  components: {
    MenuBar,
    AlertItem,
    FooterBar,
  },
};
</script>

<style>
/* Prevent Scrollbar from moving */
html,
body {
  height: 101%;
}
.wrapper {
  min-height: 100%;
}
</style>
