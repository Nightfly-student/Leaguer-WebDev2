<template>
  <div>
    <MenuBar />
    <RouterView />
    <AlertItem />
  </div>
</template>

<script>
import MenuBar from "./components/layout/MenuBar.vue";
import AlertItem from "./components/AlertItem.vue";

export default {
  components: {
    MenuBar,
    AlertItem,
  },
};
</script>

<style></style>
