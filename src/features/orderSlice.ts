import { createSlice } from '@reduxjs/toolkit'
// action 
import { fetchOrders, addAsyncOrder } from '../../src/actions/OrderAction'
import { orderFetchedType } from '../components/models';
const initialState: orderFetchedType = {
  orders: [],
  loading: false,
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
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addAsyncOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(addAsyncOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(addAsyncOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;