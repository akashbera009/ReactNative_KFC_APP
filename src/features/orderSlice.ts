import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKEND_SERVER} from './backendLink'

interface orderFetchedType {
  orders: OrderHistory[],
  loading: string
}
const initialState: orderFetchedType = {
  orders: [],
  loading: 'idle',
};
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await axios.get(`${BACKEND_SERVER}/orders`);
  return res.data
})
export const addAsyncOrder = createAsyncThunk('orders/addOrder', async (order: OrderHistory) => {
  const res = await axios.post(`${BACKEND_SERVER}/orders`, order);
  return res.data;
})
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