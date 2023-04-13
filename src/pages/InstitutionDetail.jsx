import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
import axios from 'axios';

export default function InstitutionDetail() {

  const {id} = useParams();

  const reloaded = useSelector(reloadValueState)

  const [usersData, setUsersData] = useState([])


  useEffect(() => {
    axios.get('https://whale-app-qsx89.ondigitalocean.app/insti/find/' + id).then((res) => {
      console.log(res.data.response)
      setUsersData(res.data.response)
      console.log(res)
  }).catch((error) => {
      console.log(error);
  })
  }, [reloaded])
  


  return (
    <Sidebar>
    <main className='bg-gray-200 min-h-screen min-w-screen' >
    <Header/>
    <div className='div-go-back px-3' >

<Link to={'/institutions'}  >
    <div className='rounded-lg bg-blue-200 p-2 w-[4rem] mx-5 flex justify-center text-gray-600'>
        <p>atras</p>
    </div>
</Link>

</div>



   <div className='p-4'>
   <div className='w-full m-auto p-4 border rounded-lg overflow-y-auto' >
                        <div className='flex justify-around flex-wrap gap-4' >

                            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4 ' >
                                <div className='flex flex-col w-full pb-2 gap-2' >
                                    <p className='text-2xl font-bold ' >Nombre: {usersData?.name}</p>
                                    <p className='text-gray-600' >Direccion: {usersData?.address} </p>
                                    <p className='text-gray-600' >Telefono: {usersData?.phone} </p>
                                    <p className='text-gray-600' >Email: {usersData?.email}</p>
                                    <p className='text-gray-600' >Administrador: </p>
                                </div>
                            </div>

                            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4 ' >
                                <div className='flex flex-col w-full pb-2 gap-2' >
                                    <p className='text-2xl font-bold ' >Escuelas: </p>
                                    <p className='text-gray-600' >Direccion: </p>
                                    <p className='text-gray-600' >Telefono: </p>
                                    <p className='text-gray-600' >Email: </p>
                                    <p className='text-gray-600' >Administrador: </p>
                                </div>
                            </div>

                            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4 ' >
                                <div className='flex flex-col w-full pb-2 gap-2' >
                                    <p className='text-2xl font-bold ' >Programas: </p>
                                    <p className='text-gray-600' >Direccion: </p>
                                    <p className='text-gray-600' >Telefono: </p>
                                    <p className='text-gray-600' >Email: </p>
                                    <p className='text-gray-600' >Administrador: </p>
                                </div>
                            </div>
                            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4 ' >
                                <div className='flex flex-col w-full pb-2 gap-2' >
                                    <p className='text-2xl font-bold ' >Profesores: </p>
                                    <p className='text-gray-600' >Direccion: </p>
                                    <p className='text-gray-600' >Telefono: </p>
                                    <p className='text-gray-600' >Email: </p>
                                    <p className='text-gray-600' >Administrador: </p>
                                </div>
                            </div>




                        </div>
</div>
    </div>
  </main>
</Sidebar>
  )
}
