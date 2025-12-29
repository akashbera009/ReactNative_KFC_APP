import React from 'react'
import CartPage from '../components/Menu/CartPage'

const CartScreen = ({ route }: CartScreenProps) => {
  const { discount, discountPercentage, offerCode } = route.params
  return (
    <CartPage discount={discount} discountPercentage={discountPercentage} offerCode={offerCode} />
  )
}

export default CartScreen