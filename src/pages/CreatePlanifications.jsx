import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlanificationForm from '../components/forms/PlanificationForm'


export default function CreatePlanifications() {
  return (
    <Sidebar>
      <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header />

        <div className='p-4'>
            <div className='w-full min-h-[75vh] m-auto border rounded-lg bg-white overflow-y-auto' >
            <PlanificationForm/>
            </div>
        </div>
      </main>
    </Sidebar>
  )
}
