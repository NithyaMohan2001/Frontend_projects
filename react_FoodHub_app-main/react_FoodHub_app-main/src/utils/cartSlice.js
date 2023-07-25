import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    restaurant: {
      id: "",
      name: "",
      img: "",
    },
    items: [],
    totalCount: 0,
  },
  reducers: {
    addRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },

    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalCount = state.totalCount + 1;
    },

    removeItem: (state, action) => {
      //find item
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count--;
      }
      if (findItem.count === 0) {
        const saveItems = state.items.filter((item) => item.count > 0);
        state.items = saveItems;
      }

      /*  state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.count = item.count - 1;
        }
      });
      const saveItems = state.items.filter((item) => item.count > 0);
      state.items = saveItems; */
      state.totalCount = state.totalCount - 1;
    },
    clearCart: (state) => {
      for (const key in state.restaurant) {
        state.restaurant = { ...state.restaurant, [key]: "" };
      }
      state.items = [];
      state.totalCount = 0;
    },
  },
});
export const { addRestaurant, addItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
