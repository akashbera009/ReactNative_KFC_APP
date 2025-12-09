import { createSelector } from "@reduxjs/toolkit" // reselect

export const getCurrentOrder = createSelector(
  (state) => state.cartSlice.cartItems,
  (cartItems) => cartItems.filter((item: any)=> item.text !== '')
)

// import { getCurrentOrder } from './getCurrentOrder';
// const currentOrder = useSelector(getCurrentOrder);