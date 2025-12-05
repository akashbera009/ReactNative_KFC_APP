import React from 'react'
import PaymentModal from '../components/CheckOut/PaymentModal'
const PaymentModalScreen = ({route}: PaymentModalScreenProps) => {
  const {amount ,orderId  ,onSuccess } = route.params
  return (
   <PaymentModal amount ={amount} orderId ={orderId} onSuccess ={onSuccess }/>
  )
}
export default PaymentModalScreen