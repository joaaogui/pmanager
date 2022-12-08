import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menu: {
      drink: [
        {
          id: "1",
          name: "Cerveja Preta",
          price: 10.0,
          section: "drink",
        },
        {
          id: "2",
          name: "Taça de Vinho",
          price: 18.0,
          section: "drink",
        },
        {
          id: "3",
          name: "Caipirinha",
          price: 12.0,
          section: "drink",
        },
      ],
      food: [
        {
          id: "4",
          name: "Arroz Branco",
          price: 15.0,
          section: "food",
        },
      ],
      portion: [
        {
          id: "5",
          name: "Batata Frita",
          price: 22.5,
          section: "portion",
        },
      ],
      salad: [
        {
          id: "6",
          name: "Salada de Alface",
          price: 16.75,
          section: "salad",
        },
        {
          id: "7",
          name: "Salada Caesar",
          price: 25.88,
          section: "salad",
        },
      ],
    },
  }),
  getters: {
    sections: (state) => Object.keys(state.menu),
  },
  actions: {
    getItemById(itemId) {
      const items = Object.values(this.menu).flat(1);
      return items.find((item) => {
        return item.id === itemId;
      });
    },
  },
});
