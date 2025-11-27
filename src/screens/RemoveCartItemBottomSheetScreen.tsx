import React from 'react'
import RemoveCartItem from '../components/Menu/bottomSheets/RemoveCartItem'

const RemoveCartItemBottomSheetScreen = ({route }: RemoveCartItemBottomSheetScreenProps) =>{
    const { imageLink  , idx }:RemoveCartItemProps= route.params; 
    return (
            <RemoveCartItem imageLink = {imageLink} idx ={idx} />
    )
}

export default RemoveCartItemBottomSheetScreen