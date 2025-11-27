import React from 'react'
import CheckOut from '../components/CheckOut/CheckOut'

const CheckOutScreen = ({route}:CheckOutScreenProps ) => {
    const {totalAmount} = route.params
  return (
   <CheckOut totalAmount= {totalAmount}/>
  )
}

export default CheckOutScreen