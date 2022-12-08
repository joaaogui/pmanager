<template>
  <div class="table">
    <span
      class="table__content"
      :class="{ 'table__content--occupied': !!table.openingTime }"
      @click="redirectToOrder"
    >
      <span v-if="table.openingTime" class="table__content__time">{{
        table.openingTime
      }}</span>
      <span
        v-if="tableStore.tableFinalValue(table.id) > 0"
        class="table__content__price"
        >R$ {{ tableStore.tableFinalValue(table.id) }}</span
      >
      <span class="table__content__name">{{ table.name }}</span>
    </span>
    <span class="table__actions">
      <span class="table__actions__payment" @click="redirectToPayment">$</span>
      <span class="table__actions__add" @click="redirectToOrder">+</span>
    </span>
  </div>
</template>
<script>
import { useTableStore } from "@/stores/table";

export default {
  props: {
    table: Object,
  },
  setup() {
    return {
      tableStore: useTableStore(),
    };
  },
  methods: {
    redirectToOrder() {
      this.$router.push({ name: "order", params: { id: this.table.id } });
    },
    redirectToPayment() {
      this.$router.push({ name: "payment", params: { id: this.table.id } });
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  position: relative;
  width: 120px;
  height: 120px;

  &__content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    border: 2.5px solid darkslategray;
    border-radius: 50%;
    cursor: pointer;
    height: 100%;
    justify-content: space-around;
    box-shadow: 0px 0px 11px 0px lightgray;
    gap: 6px;

    &--occupied {
      background-color: lightgray;

      & .table__content__name {
        font-size: 0.8rem;
        margin-bottom: 20px;
      }

      & + .table__actions {
        display: block;
      }
    }

    &__time {
      font-size: 0.7rem;
      margin-top: 15px;
    }

    &__price {
      font-size: 1.3rem;
    }

    &__name {
      font-size: 1.2rem;
    }

    &:hover {
      background-color: gray;
      color: white;
    }
  }

  &__actions {
    display: none;

    &__payment {
      position: absolute;
      right: -5%;
      bottom: 5%;
      border: 2px solid darkslategray;
      border-radius: 50%;
      height: 33px;
      width: 33px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      font-size: 1.1rem;

      &:hover {
        background-color: lightblue;
        color: white;
      }
    }

    &__add {
      position: absolute;
      right: 50%;
      bottom: -19%;
      background-color: white;
      transform: translate(50%);
      height: 33px;
      width: 33px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid darkslategray;
      border-radius: 50%;
      font-size: 1.5rem;

      &:hover {
        background-color: lightgreen;
        color: white;
      }
    }
  }
}
</style>
