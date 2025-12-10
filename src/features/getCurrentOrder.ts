import { createSelector } from "@reduxjs/toolkit" // reselect
import { UseSelector } from "react-redux"

const selectOrderHistory = (state: any) => state.orders;

export const selectCurrentOrder = createSelector(
  [selectOrderHistory ], 
  (orders) => {
    if (!Array.isArray(orders)) return null;

    const activeOrders = orders.filter(
      (order) => order.status === "Being Prepared"
    );
    if (activeOrders.length === 0) return null;
    const sorted = activeOrders.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted[0];
  }
)

// import { getCurrentOrder } from './getCurrentOrder';
// const currentOrder = useSelector(getCurrentOrder);