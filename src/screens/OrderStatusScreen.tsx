import React from 'react'
import OrderStatus from '../components/Orders/OrderStatus'

const OrderStatusScreen = ({ route }: OrderStatusScreenProps) => {
    const { currentOrder,
        paymentMode,
        orderId,
        OrderDate,
        OrderTime,
        vatAmount,
        GrandTotal,
        SubTotal,
        deliveriCharge,
        orderStatus }: OrderStatusScreenProps = route.params;
    return (
        <OrderStatus
            currentOrder={currentOrder}
            orderId={orderId}
            OrderDate={OrderDate}
            OrderTime={OrderTime}
            paymentMode={paymentMode}
            vatAmount={vatAmount}
            GrandTotal={GrandTotal}
            SubTotal={SubTotal}
            deliveriCharge={deliveriCharge}
            orderStatus={orderStatus}
        />
    )
}

export default OrderStatusScreen