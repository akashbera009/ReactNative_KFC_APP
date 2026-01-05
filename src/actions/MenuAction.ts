
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Config from "react-native-config";
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    try {
        const res = await axios.get(`${Config.BACKEND_SERVER}/menu`);
        return res.data
    } catch (e) {
        console.log('error', e);
        throw e
    }
})
