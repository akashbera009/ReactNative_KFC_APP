import React from 'react'
import MenuCategorizeScreenBottomSheet from '../components/Menu/bottomSheets/MenuCategorizeScreenBottomSheet'

const MenuCategorizeScreen = ({ route }: MenuCategorizationScreenProps) => {
  const { frequencyArray } = route.params;
  return (
    <MenuCategorizeScreenBottomSheet
      // activeCategory={activeCategory}
      // setActiveCategory={setActiveCategory}
      frequencyArray={frequencyArray}
    />
  )
}

export default MenuCategorizeScreen