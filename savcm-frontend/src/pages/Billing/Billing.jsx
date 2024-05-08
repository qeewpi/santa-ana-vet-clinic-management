import React from 'react'
import BillingForm from './BillingForm'
import { MenuBarBilling } from './MenuBarBilling'

export default function Billing() {
  return (
    <div className='min-w-full px-[2rem] py-[1rem]'>
        <BillingForm />
        <MenuBarBilling />
    </div>
  )
}
