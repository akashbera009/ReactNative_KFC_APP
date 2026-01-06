import { createSlice } from "@reduxjs/toolkit";
// action
import { fetchMenu } from '../../src/actions/MenuAction'
import { menuSliceInitialState } from "../components/models";
const initialState: menuSliceInitialState = {
    menuData: [],
    loading: false
};
const menuSlice = createSlice({
    name: 'menuData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.loading = false
                state.menuData = action.payload;
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.loading = false
                state.menuData = []
            })
    }
})
export default menuSlice.reducer;