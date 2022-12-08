<template>
  <button @click="redirectToTables">{{ label }}</button>
</template>
<script>
export default {
  props: {
    label: String,
  },
  methods: {
    redirectToTables() {
      this.$router.push({ name: "tables" });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 46px;
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  background-color: lightgray;

  &__greeting {
    position: absolute;
    left: 12px;
  }

  &__time {
    display: flex;
    flex-direction: column;
  }
}
</style>
