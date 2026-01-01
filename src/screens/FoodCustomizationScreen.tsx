import React from 'react'
import FoodCustomizationPage from '../components/Menu/FoodCustomizationPage'

const FoodCustomizationScreen = ({ route }: FoodCustomizationScreenProps) => {
  const { foodItem } = route.params
  return (
    <FoodCustomizationPage foodItem={foodItem} />
  )
}

export default FoodCustomizationScreen