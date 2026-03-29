import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items
  totalPrice: 0, // Total price of all items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart
     * If item already exists, increment quantity
     * If not, add new item with quantity 1
     */
    addToCart: (state, action) => {
      const { id, image, price, material, description, weight } = action.payload;
      
      // Check if item already in cart
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        // Item exists - increment quantity
        existingItem.quantity += 1;
      } else {
        // New item - add to cart with quantity 1
        state.items.push({
          id,
          image,
          price,
          material,
          description: description || 'Recyclable material',
          weight: weight || '1 kg',
          quantity: 1,
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
      
      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    /**
     * Remove item from cart completely
     */
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    /**
     * Update quantity of item in cart
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // Remove if quantity is 0 or less
          state.items = state.items.filter(i => i.id !== id);
        }
      }
      
      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    /**
     * Clear entire cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
