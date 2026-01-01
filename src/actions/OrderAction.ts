import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_SERVER } from '../utils/backendLink'
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    try {
        const res = await axios.get(`${BACKEND_SERVER}/orders`);
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
})
export const addAsyncOrder = createAsyncThunk('orders/addOrder', async (order: OrderHistory) => {
    try {
        const res = await axios.post(`${BACKEND_SERVER}/orders`, order);
        return res.data;
    } catch (error) {
        console.log(error)
        throw error
    }
})