import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { reloadValueState } from '../features/reloadSlice'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import UserList from '../components/UserList'

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
        <UserList usersData={usersData} />
      </main>
    </Sidebar>
  )
}
