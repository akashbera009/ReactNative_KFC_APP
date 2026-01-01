import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_SERVER } from '../utils/backendLink'
import axios from 'axios';

export const fetctUserDeatails = createAsyncThunk<userDatailsType, string>(
    'users/fetctUserDeatails',
    async (mobileNO: string) => {
        try {
            const res = await axios.get(`${BACKEND_SERVER}/users/mobile/${mobileNO}`)
            return res.data
        } catch (e) {
            console.log(e);
            throw e
        }
    })

export const addUserDetails = createAsyncThunk(
    "users/addUserDetails",
    async (newUser: Omit<userDatailsType, "id">) => {
        try {
            const res = await axios.post(`${BACKEND_SERVER}/users`, newUser);
            return res.data as userDatailsType;
        } catch (e) {
            console.log(e);
            throw e
        }
    }
);

export const updateUser = createAsyncThunk<
    userDatailsType,
    UpdateUserPayload
>(
    'users/updateUser',
    async ({ id, data }) => {
        try {
            const res = await axios.put(
                `${BACKEND_SERVER}/users/${id}`,
                data
            );
            return res.data;
        } catch (e) {
            console.log(e);
            return e
        }
    }
)