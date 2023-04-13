import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { reloadValueState } from '../features/reloadSlice'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { BsPersonFill, BsTrash } from 'react-icons/bs';

export default function Users() {

  const reloaded = useSelector(reloadValueState)


  const [usersData, setUsersData] = useState([])


  useEffect(() => {
    axios.get('https://whale-app-qsx89.ondigitalocean.app/admin/users').then((res) => {

      if (res.data) {
        setUsersData(res.data.users)
      }
    }).catch((error) => {
      console.log(error)
    })

  }, [reloaded])

  return (
    <Sidebar>
      <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header />

        <div className='p-4' >
          <div className='w-full m-auto border rounded-lg bg-white overflow-y-auto' >
            <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
              <span>Usuario</span>
              <span className='sm:text-left text-right' >Email</span>
              <span className='hidden md:grid' >Status</span>
              <span className='hidden sm:grid'>Rol</span>
            </div>

            <ul>
              {
                usersData.map((user, _id) => (
                  <li key={_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer' >
                    <div className='flex items-center' >
                      <div className='bg-purple-100 p-3 rounded-lg'>
                        <BsPersonFill className='text-purple-800' />
                      </div>
                      <p className='pl-4' >{`${user.name} ${user.lastName}`} </p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right '> {user.email}</p>
                    <p className={user.logged === "true" ? 'bg-green-200 p-2 rounded-lg w-[4rem] text-green-900' : 'bg-red-200 p-2 rounded-lg w-[4rem] text-red-900 hidden md:flex'} > {user.logged === "true" ? "Online" : "Offline"}  </p>
                    <div className='sm:flex hidden  justify-between items-center'>
                      <p> {user.role} </p>
                      <BsTrash />
                    </div>

                  </li>
                ))
              }
            </ul>


          </div>

        </div>
      </main>
    </Sidebar>
  )
}
