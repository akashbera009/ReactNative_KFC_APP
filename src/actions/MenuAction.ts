
import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from 'axios';
import { BACKEND_SERVER } from '../utils/backendLink'

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    try {
        const res = await axios.get(`${BACKEND_SERVER}/menu`);
        return res.data
    } catch (e) {
        console.log('error', e);
        return e
    }
})
