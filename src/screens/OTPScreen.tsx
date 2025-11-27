import React from 'react'

// custom component 
import OtpPage from '../components/Auth/OtpPage'

const OTPScreen = ({route}: OtpScreenPropType ) => {
    const {phoneNo}: { phoneNo: string } = route.params;
    return (
        <OtpPage phoneNo1= {phoneNo}/>
    )
}

export default OTPScreen