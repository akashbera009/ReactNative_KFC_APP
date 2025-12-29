import React from 'react'
// custom component 
import OtpPage from '../components/Auth/OtpPage'
const OTPScreen = ({route}: OtpScreenPropType ) => {
    const {phoneNo}: { phoneNo: string } = route.params;
    return (
        <OtpPage phoneNo= {phoneNo}/>
    )
}

export default OTPScreen