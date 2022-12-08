import { defineStore } from "pinia";
import { useMenuStore } from "@/stores/menu";
import { todaysTime } from "@/utils";

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    tables: [
      {
        id: "1",
        openingTime: "21:16",
        name: "Mesa 1",
        items: [
          {
            id: "1",
            amount: 3,
            time: "12:34",
          },
          {
            id: "2",
            amount: 7,
            time: "22:42",
          },
          {
            id: "3",
            amount: 3,
            time: "08:55",
          },
        ],
        payments: [
          {
            time: "15:16",
            date: "31/07/2022",
            value: 4.56,
          },
          {
            time: "15:46",
            date: "01/07/2022",
            value: 54.56,
          },
        ],
      },
      {
        id: "2",
        openingTime: null,
        name: "Mesa 2",
        items: [],
      },
      {
        id: "3",
        openingTime: null,
        name: "Mesa 3",
        items: [],
      },
      {
        id: "4",
        openingTime: "18:36",
        name: "Mesa 4",
        items: [
          {
            id: "6",
            amount: 36,
            time: "12:45",
          },
          {
            id: "4",
            amount: 7,
            time: "10:15",
          },
        ],
        payments: [
          {
            time: "15:46",
            date: "07/07/2022",
            value: 64.56,
          },
          {
            time: "10:46",
            date: "15/07/2022",
            value: 52.16,
          },
        ],
      },
      {
        id: "5",
        openingTime: "17:38",
        name: "Mesa 5",
        items: [
          {
            id: "3",
            amount: 36,
            time: "12:45",
          },
          {
            id: "4",
            amount: 8,
            time: "19:35",
          },
        ],
      },
    ],
  }),
  actions: {
    updateTables(table) {
      const updatedTables = this.tables.map((addedTable) =>
        table.id === addedTable.id ? table : addedTable
      );
      this.$patch({ tables: updatedTables });
    },
    updateTableItems(item, itemId, table) {
      const updatedItems = table.items.map((tableItem) => {
        if (itemId === tableItem.id && tableItem && item)
          tableItem.amount = item.amount;
        return tableItem;
      });
      table.items = updatedItems;
      return table;
    },
    closeTable(tableId) {
      const table = this.getTableById(tableId);
      table.openingTime = null;
      this.updateTables(table);
    },
    getTableById(tableId) {
      return this.tables.find((table) => table.id === tableId);
    },
    getTableItemById(tableId, itemId) {
      return this.getTableById(tableId).items.find((item) => {
        return item.id === itemId;
      });
    },
    updateItem(tableId, itemId, decrease = false) {
      const item = this.getTableItemById(tableId, itemId);
      let table = this.getTableById(tableId);
      const time = todaysTime();
      if (item === undefined) {
        this.addNewItemToTable(itemId, time, table);
      } else if (decrease) {
        item.amount -= 1;
        item.time = time;
      } else {
        item.amount += 1;
        item.time = time;
      }
      table = this.updateTableItems(item, itemId, table);
      this.updateTables(table);
    },
    addNewItemToTable(itemId, time, table) {
      const menuStore = useMenuStore();
      const itemToAdd = menuStore.getItemById(itemId);
      itemToAdd.amount = 1;
      itemToAdd.time = time;
      if (table.items.length === 0) {
        table.openingTime = time;
      }
      table.items.push(itemToAdd);
      this.updateTables(table);
    },
    updatePayments(tableId, payment) {
      console.log(typeof payment);
      const table = this.getTableById(tableId);
      let { payments } = table;
      if (!payments) payments = [];
      payments.push(payment);
      table.payments = payments;
      this.updateTables(table);
    },
    paymentsTotal(tableId) {
      const table = this.getTableById(tableId);
      if (!table.payments) return 0;
      const sum = table.payments.reduce((a, b) => a + b.value, 0);
      return sum ?? 0;
    },
    tableFinalValue(tableId, noPayments = false) {
      const table = this.getTableById(tableId);
      const items = table.items;
      if (items.length === 0) return 0;
      const total = items
        .map((item) => {
          const menuStore = useMenuStore();
          const itemToAdd = menuStore.getItemById(item.id);
          return itemToAdd ? itemToAdd.price * item.amount : null;
        })
        .reduce((a, b) => a + b, 0);
      return noPayments ? total : total - this.paymentsTotal(tableId);
    },
  },
});
