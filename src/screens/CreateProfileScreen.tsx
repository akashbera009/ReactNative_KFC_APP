import React from 'react'
import CreateProfilePage from '../components/Home/CreateProfilePage'

const CreateProfileScreen = ({route}: CreateProfilePageProps) => {
  const {phoneNo}:{phoneNo:string} = route?.params
  return (
    <CreateProfilePage phoneNo ={phoneNo}/>
  )
}

export default CreateProfileScreen