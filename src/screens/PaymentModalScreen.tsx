import React from 'react'
import PaymentModal from '../components/CheckOut/PaymentModal'
const PaymentModalScreen = ({ route }: PaymentModalScreenProps) => {
  const { amount, onSuccess
  } = route.params
  return (
    <PaymentModal
      amount={amount}
      onSuccess ={onSuccess}
    />
  )
}
export default PaymentModalScreen