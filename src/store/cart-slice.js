import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'name',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(({ id }) => id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        return;
      }

      // we update the item
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.totalPrice + newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      existingItem.quantity--;
      existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
