import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Layout() {
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
