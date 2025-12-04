import React from 'react'
import TrackOrder from '../components/Orders/TrackOrder'

const TrackOrderScreen = ({route}:TrackOrderScreenProps ) => {
    const {currentOrder, orderId, grandTotal } =route.params
    return (
        <TrackOrder currentOrder={currentOrder} orderId ={orderId} grandTotal ={grandTotal} />
    )
}

export default TrackOrderScreen