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
                <div className='m-3 p-2 flex  gap-1 '>
                    <h4 className=' w-[25%]' >Institución</h4>
                    <h4 className=' w-[15%]' >RUN</h4>
                    <h4 className=' w-[30%]' >Email</h4>
                    <h4 className=' w-[20%]'>Telefono</h4>
                </div>
                <InstitutionsList usersData={usersData} />


            </div>
        </div>
    </main>
</Sidebar>
  )
}
