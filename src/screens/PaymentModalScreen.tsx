import React from 'react'
import PaymentModal from '../components/CheckOut/PaymentModal'
const PaymentModalScreen = ({ route }: PaymentModalScreenProps) => {
  const { amount,
  } = route.params
  return (
    <PaymentModal
      amount={amount}
    />
  )
}
export default PaymentModalScreen