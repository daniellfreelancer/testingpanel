import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import { reloadValueState } from '../features/reloadSlice'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {FiMoreHorizontal} from 'react-icons/fi'



export default function Institutions() {

  const reloaded = useSelector(reloadValueState)
  const [usersData, setUsersData] = useState([])


  useEffect(() => {
      axios.get('https://whale-app-qsx89.ondigitalocean.app/insti/all').then((res) => {
          console.log(res.data.response)
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

                <ul>
                    {
                        usersData.map((user, _id) => (
                            <li key={_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer' >
                                <div className='flex items-center ' >
                                    {/* <div className='bg-purple-100 p-3 rounded-lg'>
                                <BsPersonFill className='text-purple-800' />
                            </div> */}
                                    <p className='' >{`${user.name}`} </p>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right '> {user.rut}</p>
                                <p className='text-gray-600 sm:text-left text-right '> {user.email}</p>
                                <div className='sm:flex hidden  justify-between items-center'>
                                    <p>+56 {user.phone} </p>

                                   <Link to={'/institutions/'+ user._id }>
                                    <div className='flex items-center gap-2 rounded-lg bg-gray-200 p-2 ' >
                                    <h3 className='text-gray-500'>ver mas</h3>
                                    <FiMoreHorizontal  /> 

                                    </div>
                                      
                                       
                                   </Link> 
                                    
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
