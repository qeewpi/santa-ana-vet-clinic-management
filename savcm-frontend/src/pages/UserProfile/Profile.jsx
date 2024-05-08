import React from 'react'
import {ProfileForm} from './ProfileForm'
import Appointments from '../Appointments/Appointments'
export default function UserProfile() {
  
  return (
    <div className=" flex flex-col md:grid md:grid-cols-2 gap-2">
  <ProfileForm className ="h-96"/>

  <Appointments className="h-96"/>
</div>
  )
} 
