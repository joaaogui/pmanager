<template>
  <div class="tables">
    <TableComponent
      v-for="(table, i) in store.tables"
      :table="table"
      :key="i"
    />
  </div>
</template>

<script>
import { useTableStore } from "@/stores/table";
import TableComponent from "@/components/TableComponent.vue";

export default {
  components: { TableComponent },
  setup() {
    const store = useTableStore();
    return {
      store,
    };
  },
};
</script>
<style>
.tables {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 24px;
  padding: 24px;
}
</style>
