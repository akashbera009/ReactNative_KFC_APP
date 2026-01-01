import { createSlice } from "@reduxjs/toolkit";
// actions 
import { fetctUserDeatails, updateUser } from '../../src/actions/UserAction'

export const initialState: userfetchedType = {
    currentUser: null,
    loading: 'ideal'
}
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
            .addCase(updateUser.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = 'success';
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = 'error';
            })
    }
})

export default userSlice.reducer