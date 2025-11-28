import React from 'react'
import OrderDetails from '../components/Orders/OrderDetails'

const OrderDetailsScreen = ({route}:OrderDetailsScreen ) => {
    const {order} = route.params ; 
  return (
    <OrderDetails order={order}/>
  )
}

export default OrderDetailsScreen