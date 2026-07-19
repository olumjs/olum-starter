import { store } from "olum";

export const cart = store({
  items: [],
  add(name) {
    this.items.push(name)
  },
  clear() {
    this.items = [];
  },
});
