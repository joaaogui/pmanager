<template>
  <view-wrapper>
    <div class="payment">
      <span class="payment__title">Novo Pagamento</span>
      <div class="payment__summary">
        <table class="payment__summary__table divider">
          <tr class="payment__summary__table__header">
            <th>PEDIDO</th>
            <th>QTD.</th>
            <th>HORÁRIO</th>
            <th>UND</th>
            <th class="payment__summary__table__header__total">VALOR</th>
          </tr>
          <tr
            class="payment__summary__table__item"
            v-for="(item, i) in table.items"
            :key="i"
          >
            <td class="payment__summary__table__item__name">
              {{ menuItem(item.id).name }}
            </td>
            <td class="payment__summary__table__item__amount">
              {{ item.amount }}
            </td>
            <td class="payment__summary__table__item__time">{{ item.time }}</td>
            <td class="payment__summary__table__item__price">
              R$ {{ menuItem(item.id).price }}
            </td>
            <td class="payment__summary__table__item__total">
              R${{ itemTotal(item.id).toFixed(2) }}
            </td>
          </tr>
        </table>
        <div v-if="table.payments" class="payment__summary__partial divider">
          <span class="payment__summary__partial__label">TOTAL PARCIAL</span>
          <span class="payment__summary__partial__value"
            >R$ {{ remainingValue(true).toFixed(2) }}
          </span>
        </div>
        <div v-if="table.payments" class="payment__summary__payment divider">
          <div class="payment__summary__payment__header">
            <span>DATA</span> <span>PAGAMENTOS</span>
          </div>
          <span
            class="payment__summary__payment__data"
            v-for="(payment, i) in table.payments"
            :key="i"
          >
            <span class="payment__summary__payment__data__time">
              <span>{{ payment.date }}</span>
              <span>{{ payment.time }}</span>
            </span>
            <span class="payment__summary__payment__data__value"
              >- R$ {{ payment.value.toFixed(2) }}</span
            >
          </span>
        </div>
        <div class="payment__summary__total">
          <span class="payment__summary__total__label">TOTAL RESTANTE</span>
          <span class="payment__summary__total__value"
            >R$ {{ remainingValue().toFixed(2) }}
          </span>
        </div>
      </div>

      <div class="payment__value">
        <span class="payment__value__name">{{ table.name }}</span>
        <span class="payment__value__price">
          R$
          <input
            type="number"
            min="1"
            step="any"
            class="payment__value__price__input"
            v-model.number="paymentValue"
            @keyup.enter="addPayment(table.id)"
          />
        </span>
      </div>
      <div class="payment__buttons">
        <back-to-tables-button
          class="payment__buttons__item"
          label="Cancelar"
        />
        <button @click="addPayment(table.id)" class="payment__buttons__item">
          Pagar
        </button>
      </div>
    </div>
  </view-wrapper>
</template>

<script>
import { useTableStore } from "@/stores/table";
import { useMenuStore } from "@/stores/menu";
import { useRoute } from "vue-router/composables";
import BackToTablesButton from "@/components/BackToTablesButton.vue";
import ViewWrapper from "@/components/ViewWrapper.vue";
import { todaysDate, todaysTime } from "@/utils";

export default {
  components: { ViewWrapper, BackToTablesButton },
  setup() {
    const route = useRoute();
    const id = route.params.id;
    return {
      tableStore: useTableStore(),
      menuStore: useMenuStore(),
      table: useTableStore().getTableById(id),
    };
  },
  computed: {
    id() {
      const route = useRoute();
      return route.params.id;
    },
  },
  data() {
    return {
      paymentValue: 0,
    };
  },
  methods: {
    itemTotal(itemId) {
      return this.itemAmount(itemId) * this.menuItem(itemId).price;
    },
    remainingValue(noPayments = false) {
      return this.tableStore.tableFinalValue(this.table.id, noPayments);
    },
    menuItem(itemId) {
      return this.menuStore.getItemById(itemId);
    },
    itemAmount(id) {
      const paymentItem = this.table.items.find((item) => item.id === id);
      return paymentItem ? paymentItem.amount : 0;
    },
    changeAmount(id) {
      return id;
    },
    addPayment(id) {
      console.log(typeof this.remainingValue());
      if (this.paymentValue > 0 && this.paymentValue <= this.remainingValue()) {
        const date = todaysDate();
        const time = todaysTime();
        const value = this.paymentValue;
        const payment = {
          date,
          time,
          value,
        };

        this.tableStore.updatePayments(id, payment);
        this.paymentValue = this.remainingValue();
      } else {
        alert("valor maior do que o restante");
      }
    },
  },
  mounted() {
    this.paymentValue = this.remainingValue();
  },
};
</script>
<style scoped lang="scss">
.payment {
  display: flex;
  background-color: white;
  padding: 16px 64px;
  flex-direction: column;
  border-radius: 8px;
  overflow: auto;
  @media only screen and (max-width: 720px) {
    height: 100%;
    width: 100%;
    border: none;
    padding-top: 64px;
    padding-left: 24px;
    padding-right: 24px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.75rem;
  }

  &__title {
    font-size: 1.4rem;
    margin-bottom: 20px;
    text-align: center;
    color: darkslategray;
  }

  &__summary {
    background-color: whitesmoke;
    padding: 12px;
    color: #222;

    &__table {
      width: 100%;

      &__header {
        & th {
          font-weight: normal;
          text-align: left;
          padding-right: 15px;
          padding-bottom: 6px;
        }

        &__total {
          text-align: right !important;
          padding: 0 !important;
        }
      }

      &__item {
        & td {
          padding-right: 15px;
          text-align: left;
          font-size: 0.95rem;
          @media only screen and (max-width: 500px) {
            font-size: 0.75rem;
          }
        }

        &__total {
          text-align: right !important;
          margin: 0;
          padding: 0 !important;
        }
      }
    }

    &__partial {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
    }

    &__payment {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2px;

      &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      &__data {
        display: flex;
        justify-content: space-between;

        &__time {
          display: flex;
          gap: 10px;
        }
      }
    }

    &__total {
      display: flex;
      justify-content: end;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
    }
  }

  &__value {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 1.6rem;
    margin: 20px 0;
    align-items: center;

    &__price {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 14px;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      &__input {
        font-size: 16px;
        max-width: 50px;
        height: 30px;
        background-color: #eee;
        border: none;
        padding-left: 14px;

        &:focus-visible {
          outline: none;
        }
      }
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

.divider {
  border-bottom: 1px dashed darkslategray;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>
