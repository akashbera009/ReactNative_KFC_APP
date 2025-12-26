import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store/store";
import { BACKEND_SERVER } from '../utils/backendLink'

interface userfetchedType {
    currentUser: userDatailsType | null,
    loading: string
}
type UpdateUserPayload = {
    id: string;
    data: {
        name?: string;
        email?: string;
        avatar?: string;
    };
};

export const initialState: userfetchedType = {
    currentUser: null,
    loading: 'ideal'
}
export const fetctUserDeatails = createAsyncThunk<userDatailsType, string>(
    'users/fetctUserDeatails',
    async (mobileNO: string) => {
        const res = await axios.get(`${BACKEND_SERVER}/users/mobile/${mobileNO}`)
        return res.data
    })
export const selectCurrentUser = (state: RootState) => {
    console.log('current user ', state.users.currentUser);

    return state.users.currentUser;
}

export const addUserDetails = createAsyncThunk(
    "users/addUserDetails",
    async (newUser: Omit<userDatailsType, "id">) => {
        const res = await axios.post(`${BACKEND_SERVER}/users`, newUser);
        return res.data as userDatailsType;
    }
);

export const updateUser = createAsyncThunk<
    userDatailsType,
    UpdateUserPayload
>(
    'users/updateUser',
    async ({ id, data }) => {
        const res = await axios.put(
            `${BACKEND_SERVER}/users/${id}`,
            data
        );
        return res.data;
    }
)
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
                state.currentUser = action.payload;
                state.loading = 'success';
            })
            .addCase(fetctUserDeatails.rejected, (state) => {
                state.loading = 'error';
            })
            // .addCase(addUserDetails.fulfilled, (state, action) => {
            //     state.userData.push(action.payload);
            // })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            });
    }
})

export default userSlice.reducer