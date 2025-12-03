import React from 'react'
import CheckOut from '../components/CheckOut/CheckOut'

const CheckOutScreen = ({route}:CheckOutScreenProps ) => {
    const {totalAmount , discount} = route.params
  return (
   <CheckOut totalAmount= {totalAmount} discount={discount}/>
  )
}

export default CheckOutScreen