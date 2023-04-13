import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Homepage() {
  return (
    <Sidebar>
        <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header/>
        {/* <Topcards/> */}
       <div className='p-4 grid md:grid-cols-3 gap-4'>
        <h2>Home</h2>
        {/* <Barchart/>
        <RecentOrders/> */}
        </div>
      </main>
    </Sidebar>
  )
}
