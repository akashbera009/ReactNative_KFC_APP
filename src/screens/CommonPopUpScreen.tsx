import React from 'react'
import { CommonPopUp } from '../components/PopUp/CommonPopUp'

const CommonPopUpScreen = ({route}: CommonPopUpScreenProps) => {
    const {message , header} = route.params
    return (
        <CommonPopUp message ={message} header={header}/>
    )
}

export default CommonPopUpScreen