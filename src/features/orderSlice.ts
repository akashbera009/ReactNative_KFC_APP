import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_SERVER = 'http://localhost:3000'

interface orderFetchedType {
    orders: OrderHistory[],
    loading: string
}
const initialState : orderFetchedType = {
  orders: [],
  loading: 'idle',
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const res = await axios.get(`${BACKEND_SERVER}/orders`);
    return res.data
})
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = 'success';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = 'error';
      });
  },
});

export default orderSlice.reducer;
