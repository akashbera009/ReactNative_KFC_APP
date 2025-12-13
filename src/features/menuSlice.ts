import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {BACKEND_SERVER} from './backendLink'

const initialState : {
  menuData: menuDataType[];
  loading: string;
} = {
  menuData: [],
  loading: 'ideal'
};
// async menu data fetchstor
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    const res = await axios.get(`${BACKEND_SERVER}/menu`);
    return res.data
})

const menuSlice = createSlice({
    name: 'menuData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMenu.pending, (state) => {
            state.loading = 'Pending'
        })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.loading = 'Success'
                state.menuData = (action.payload);
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.loading = 'Error'
            })
    }
})
export default menuSlice.reducer;