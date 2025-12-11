import { createSlice } from "@reduxjs/toolkit";

type FavoriteState = {
    favorites: string[];
};
const initialState: FavoriteState = {
    favorites: []
}
const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite: (state, action) => {
            const uid: string = action.payload
            const index = state.favorites.indexOf(uid)
            if (index == -1) {
                state.favorites.push(uid)
            } else {
                state.favorites.splice(index, 1)
            }
        }
    }
})
export const { toggleFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer