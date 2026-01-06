import { createSlice } from "@reduxjs/toolkit";
import { FavoriteState } from "../components/models";
const initialState: FavoriteState = {
    favorites: [],
    loading : false
}
const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite: (state, action) => {
            const uid: string = action.payload
            const index = state?.favorites?.indexOf(uid)
            if (index === -1) {
                state.favorites.push(uid)
            } else {
                state.favorites.splice(index, 1)
            }
        }
    }
})
export const { toggleFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer