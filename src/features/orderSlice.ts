import { createSlice } from '@reduxjs/toolkit'
// action 
import { fetchOrders, addAsyncOrder } from '../../src/actions/OrderAction'
const initialState: orderFetchedType = {
  orders: [],
  loading: 'idle',
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = 'error';
      })
      .addCase(addAsyncOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(addAsyncOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = 'success';
      })
      .addCase(addAsyncOrder.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;