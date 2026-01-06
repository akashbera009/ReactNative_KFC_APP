
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BACKEND_SERVER } from "../utils/constants";
export const fetchMenu = createAsyncThunk<
    menuDataType[],
    void
>('menu/fetchMenu', async () => {
    try {
        const res = await axios.get(`${BACKEND_SERVER}/menu`);
        return res.data
    } catch (e) {
        console.log('error', e);
        throw e
    }
})
