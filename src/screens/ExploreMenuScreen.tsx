
import React from 'react'
import IndexPage from '../components/Menu/Index'

const ExploreMenuScreen = ({route}: ExploreMenuScreenProps) => {
  const {categoryType} = route.params; 
  return (  
      <IndexPage categoryType = {categoryType} />
  )
}

export default ExploreMenuScreen