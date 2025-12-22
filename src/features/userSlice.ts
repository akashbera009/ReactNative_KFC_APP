import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store/store";
import {BACKEND_SERVER} from '../utils/backendLink'

interface userfetchedType {
    userData: userDatailsType[],
    currentUser? : {},
    loading: string
}
export const initialState: userfetchedType = {
    userData: [],
    loading: 'ideal'
}
export const fetctUserDeatails = createAsyncThunk(
    'users/fetctUserDeatails',
    async () => {
        const res = await axios.get(`${BACKEND_SERVER}/users`)
        return res.data
    })
export const selectUserByMobile = (state:RootState, mobile: string) =>
    state?.users?.userData?.find((u: userDatailsType) => u.mobileNo === mobile);

export const addUserDetails = createAsyncThunk(
    "users/addUserDetails",
    async (newUser: Omit<userDatailsType, "id">) => {
        const res = await axios.post(`${BACKEND_SERVER}/users`, newUser);
        return res.data as userDatailsType;
    }
);
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, data }: { id: string; data: Partial<userDatailsType> }) => {
        const res = await axios.put(`${BACKEND_SERVER}/users/${id}`, data);
        return res.data as userDatailsType;
    }
);
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetctUserDeatails.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetctUserDeatails.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.loading = 'success';
            })
            .addCase(fetctUserDeatails.rejected, (state) => {
                state.loading = 'error';
            })
            .addCase(addUserDetails.fulfilled, (state, action) => {
                state.userData.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.userData.findIndex(
                    (u) => u.id === action.payload.id
                );
                if (index !== -1) state.userData[index] = action.payload;
            });
    }
})

export default userSlice.reducer