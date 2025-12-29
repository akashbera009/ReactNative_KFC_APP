import { createSlice} from "@reduxjs/toolkit";
// action
import {fetchMenu} from '../../src/actions/MenuAction'

const initialState : {
  menuData: menuDataType[];
  loading: string;
} = {
  menuData: [],
  loading: 'ideal'
};
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