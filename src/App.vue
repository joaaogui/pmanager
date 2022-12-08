<template>
  <div class="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: { HeaderComponent },
};
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  max-height: 100vh;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
