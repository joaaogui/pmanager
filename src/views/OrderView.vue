<template>
  <view-wrapper>
    <div class="order">
      <span class="order__title">Novo Pedido</span>
      <div class="order__sections">
        <details
          v-for="(section, i) in store.sections"
          :key="i"
          class="order__sections__item"
        >
          <summary :for="i" class="order__sections__item__name name">
            {{ sectionsLabels[section] }}
            <span
              class="order__sections__item__name__chevron chevron"
              :class="{ 'order__sections__item__name__chevron--up': true }"
            />
          </summary>
          <div
            v-for="(item, i) in store.menu[section]"
            :key="i"
            class="order__sections__item__content"
          >
            <span class="order__sections__item__content__name">{{
              item.name
            }}</span>
            <span class="order__sections__item__content__price"
              >R$ {{ item.price }}</span
            >
            <span class="order__sections__item__content__picker">
              <span
                :class="{
                  'order__sections__item__content__picker__icon--disabled':
                    itemAmount(item.id) <= 0,
                }"
                class="order__sections__item__content__picker__icon"
                @click="changeAmount(item.id, true)"
              >
                -
              </span>
              <span>{{ itemAmount(item.id) }}</span>
              <span
                class="order__sections__item__content__picker__icon"
                @click="changeAmount(item.id)"
                >+</span
              >
            </span>
          </div>
        </details>
      </div>

      <div class="order__summary">
        <span class="order__summary__name">{{ table.name }}</span>
        <span class="order__summary__price">
          Total: R$ {{ tableStore.tableFinalValue(table.id) }}
        </span>
      </div>
      <div class="order__buttons">
        <button @click="cancelOrder" class="order__buttons__item">
          Cancelar
        </button>
        <back-to-tables-button class="order__buttons__item" label="Confirmar" />
      </div>
    </div>
  </view-wrapper>
</template>

<script>
import { useMenuStore } from "@/stores/menu";
import { useTableStore } from "@/stores/table";
import { useRoute } from "vue-router/composables";
import BackToTablesButton from "@/components/BackToTablesButton.vue";
import ViewWrapper from "@/components/ViewWrapper.vue";

export default {
  components: { ViewWrapper, BackToTablesButton },
  setup() {
    const store = useMenuStore();
    const tableStore = useTableStore();
    const route = useRoute();
    const id = route.params.id;
    const sectionsLabels = {
      drink: "Bebidas",
      food: "Lanches",
      portion: "Porções",
      salad: "Saladas",
    };
    return {
      store,
      table: useTableStore().getTableById(id),
      sectionsLabels,
      tableStore,
    };
  },
  data() {
    return {
      tablesCopy: null,
    };
  },
  methods: {
    itemAmount(id) {
      const orderItem = this.table.items.find((item) => item.id === id);
      return orderItem ? orderItem.amount : 0;
    },
    changeAmount(id, decrease = false) {
      this.tableStore.updateItem(this.table.id, id, decrease);
      return id;
    },
    confirmOrder() {
      this.$router.push({ name: "tables" });
      if (
        !this.table.items.length ||
        this.tableStore.tableFinalValue(this.table.id) === 0
      )
        this.tableStore.closeTable(this.table.id);
    },
    cancelOrder() {
      this.tableStore.$patch({ tables: this.tablesCopy });
      this.confirmOrder();
    },
  },
  mounted() {
    this.tablesCopy = JSON.parse(JSON.stringify(this.tableStore.tables));
  },
};
</script>
<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 3px solid darkslategray;
  border-radius: 8px;
  padding: 16px 64px 30px;
  width: 50%;
  overflow: auto;
  margin-bottom: 50px;
  margin-top: 50px;

  @media only screen and (max-width: 720px) {
    height: 100%;
    width: 100%;
    border: none;
    padding-top: 64px;
    padding-left: 24px;
    padding-right: 24px;
  }

  &__title {
    font-size: 1.4rem;
    margin-bottom: 20px;
    text-align: center;
  }

  &__sections {
    margin-bottom: 24px;

    .chevron {
      transform: rotate(90deg);
    }

    details[open] > .name > .chevron {
      &:before {
        transform: rotate(180deg);
      }
    }

    &__item {
      border-bottom: 1px solid lightgray;
      width: 100%;
      cursor: pointer;

      &__name {
        border-bottom: 2px solid gray;
        width: 100%;
        padding: 10px 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__chevron {
          &:before {
            content: "\203A";
            display: inline-block;
            font-size: 1.6rem;
            cursor: pointer;
          }
        }
      }

      &__content {
        display: flex;
        align-items: center;
        height: 46px;
        width: 100%;
        border-bottom: 0.5px solid lightgray;
        padding: 0 6px;

        &__name {
          width: 40%;
        }

        &__price {
          text-align: left;
        }

        &__picker {
          display: flex;
          flex-direction: row;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
          margin-left: auto;
          width: 80px;

          &__icon {
            font-size: 1.2rem;
            border-radius: 50%;
            border: 2px solid gray;
            min-height: 12px;
            height: 12px;
            min-width: 12px;
            width: 12px;

            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &--disabled {
              background-color: lightgray;
              pointer-events: none;
            }

            &:hover {
              background-color: gray;
              color: white;
            }
          }
        }
      }
    }
  }

  &__summary {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 1.6rem;
    margin: 20px 0;
    gap: 60px;

    &__name {
      font-weight: bold;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 20px;

    @media only screen and (max-width: 720px) {
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;
      margin-bottom: 100px;
    }

    &__item {
      width: 150px;
      height: 45px;
      @media only screen and (max-width: 720px) {
        width: 90%;
      }
      font-size: 1rem;
      background-color: white;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: gray;
        color: white;
      }
    }
  }
}
</style>
