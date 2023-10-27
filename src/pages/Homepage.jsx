import React from 'react'
import welcomeImg from '../assets/iphoneAppLogin.jpg'

export default function Homepage() {


  return (
    <>
      <main className='bg-gray-200 w-full' >
        <div className='w-fit'>
          <img
            src={welcomeImg}
            alt="logo-vitalmove"
          //  width={'w-fit'}
           // height={20}
            //className="ml-12"
            aria-details="VitalMove Panel"
            title="VitalMove Panel"
          />
        </div>
      </main>
    </>
  )
}
