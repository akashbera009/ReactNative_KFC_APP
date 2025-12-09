import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [{
        id: 1,
        text : ''
    }]
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: (create) => ({
        addToCart: create.preparedReducer(
            (text) => {
                return {
                    payload: {
                        id: Date.now(),
                        text,
                    }
                }
            },
            (state, action) => {
                state.cartItems.push(action.payload)
            }
        ),
        removeFromCart : (state, action )=>{
            state.cartItems = state.cartItems.filter(item=> item.id != action.payload)
        },
    })
})


export const { addToCart, removeFromCart  } = cartSlice.actions
export default cartSlice.reducer
