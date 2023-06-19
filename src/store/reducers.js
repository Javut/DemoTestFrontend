import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    emptyCart: (state) => {
      state.products = [];
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.products = state.products.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      );
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
