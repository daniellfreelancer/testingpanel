import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Planifications() {
  return (
    <Sidebar>
      <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header />
        <div className='p-4 grid md:grid-cols-3 gap-4'>
          <h2>Planificaciones</h2>
        </div>
      </main>
    </Sidebar>
  )
}
