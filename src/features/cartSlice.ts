import { createSlice } from '@reduxjs/toolkit'

const initialState: {
    cartItems: CartItemType[],
    loading: string
} = {
    cartItems: [],
    loading: 'ideal'
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeFromCart: (state, action) => {
            const removeid = action.payload
            state.cartItems = state.cartItems.filter((i: CartItemType) => i?.menuItemUid !== removeid)
        },
        increaseQuantity: (state, action) => {
            const increaseId = action.payload;
            const item = state.cartItems.find((i: CartItemType) => i.menuItemUid === increaseId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const decreaseId = action.payload
            const item = state.cartItems.find((i: CartItemType) => i.menuItemUid === decreaseId);
            if (item) {
                item.quantity -= 1;
            }
        },
        clearCart:(state  )=>{
            state.cartItems = []
        }
    }
})
export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity , clearCart} = cartSlice.actions
export default cartSlice.reducer




