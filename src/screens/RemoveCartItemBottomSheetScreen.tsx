import React from 'react'
import RemoveCartItem from '../components/Menu/bottomSheets/RemoveCartItem'

const RemoveCartItemBottomSheetScreen = ({ route }: RemoveCartItemBottomSheetScreenProps) => {
    const { imageLink, uid }: RemoveCartItemProps = route.params;
    return (
        <RemoveCartItem imageLink={imageLink} uid={uid} />
    )
}

export default RemoveCartItemBottomSheetScreen