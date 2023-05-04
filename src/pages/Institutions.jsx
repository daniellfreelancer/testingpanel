import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import { reloadValueState } from '../features/reloadSlice'
import axios from 'axios'
import InstitutionsList from '../components/InstitutionsList'



export default function Institutions() {

  const reloaded = useSelector(reloadValueState)
  const [usersData, setUsersData] = useState([])


  useEffect(() => {
      axios.get('https://whale-app-qsx89.ondigitalocean.app/insti/all').then((res) => {
          setUsersData(res.data.response)
      }).catch((error) => {
          console.log(error)
      })

  }, [reloaded])


  return (
    <Sidebar>
    <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header />
        <div className='p-4'>
            <div className='w-full m-auto border rounded-lg bg-white overflow-y-auto' >
                <div className='m-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <span >Institución</span>
                    <span className='sm:text-left text-right' >RUN</span>
                    <span className='hidden md:grid' >Email</span>
                    <span className='hidden sm:grid'>Telefono</span>
                </div>
                <InstitutionsList usersData={usersData} />


            </div>
        </div>
    </main>
</Sidebar>
  )
}
