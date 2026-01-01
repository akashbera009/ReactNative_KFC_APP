import { createSelector } from "@reduxjs/toolkit" 
import { RootState } from "../store/store";

const selectOrderHistory = (state: RootState) => state?.orders?.orders;

export const selectCurrentOrder = createSelector(
  [selectOrderHistory],
  (orders) => {
    if (!Array.isArray(orders)) return null;
    const activeOrders = orders.filter(
      (order) => order.status === "Being Prepared"
    );
    if (activeOrders.length === 0) return null;
    const sorted = activeOrders.sort(
      (a, b) => Number(b?.id) - Number(a?.id)
    );
    return sorted[0];
  }
)